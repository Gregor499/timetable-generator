import {Question, TimeAnswer, TimeUnit, WorkdayAnswer} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer, postWorkdayAnswer} from "../service/apiService";
import TimeUnitAnswer from "../components/TimeUnitAnswer";
//import "./QuestionManager.css"
import {convertTimeUnitToMinutes} from "../utilities/Util"
import WorkdayCheckboxes from "../components/WorkdayCheckboxes";
import { Select, FormControl, Box, Typography, Grid2, Card, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

interface QuestionProps {
    question: Question
    answers: Array<TimeAnswer>
    answerCallback: () => void //refreshing site
}

export default function QuestionManager(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [currentTimeAnswer, setCurrentTimeAnswer] = useState<string>()
    const [workdays, setWorkdays] = useState<boolean[]>([true, true, true, true, true, false, false]);
    const [errorMessage, setErrorMessage] = useState("")

    const question = props.question
    const answerCallback = props.answerCallback

    useEffect(() => {
      const workdayAnswerDbUpdate = () => {
        const workdayAnswer: WorkdayAnswer = {
          questionId: question.id,
          question: question.question,
          monday: workdays[0],
          tuesday: workdays[1],
          wednesday: workdays[2],
          thursday: workdays[3],
          friday: workdays[4],
          saturday: workdays[5],
          sunday: workdays[6],
        };

        postWorkdayAnswer(workdayAnswer)
          .then(() => answerCallback()) // refreshing site
          .catch(() => {
            console.error("Error posting workday answer:", Error);
            setErrorMessage("error posting answer");
          });
      };

      workdayAnswerDbUpdate();
    }, [answerCallback, question, workdays]);

    useEffect(() => {
        const loadTimeUnitList = async () => {
            try {
                const data = await getTimeUnitList();
                setTimeUnitList(data);
                } catch {
                    setErrorMessage("Failed to load time unit list")
                }
            };

            loadTimeUnitList();

        const currentAnswer = props.answers.find(answer => answer.questionId === props.question.id)
        setCurrentTimeAnswer(currentAnswer ? currentAnswer.time : "00:00");
    }, [props.answers, props.question.id])

    const timeAnswerDbUpdate = (timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: props.question.id,
            question: props.question.question,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .then(() => props.answerCallback()) // refreshing site
            .catch(() => {
                console.error("Error posting time answer:", Error);
                setErrorMessage("error posting answer");
                })
    };

    const filteredTimeUnitSelection = timeUnitList
        .filter(timeUnit => {
            if (!props.question.previousQuestionId) {
                return true;
            } else {
                const previousQuestionAnswer = props.answers.find(answer => answer.questionId === props.question.previousQuestionId)
                if (previousQuestionAnswer) {
                    const currentTimeAnswerInMinutes = convertTimeUnitToMinutes(currentTimeAnswer);
                    return (
                        timeUnit.timeInMinutes! >= previousQuestionAnswer.timeInMinutes) &&
                        timeUnit.timeInMinutes !== currentTimeAnswerInMinutes;
                } else {
                    return true;
                }
            }
        })
        .map(timeUnit => <TimeUnitAnswer key={timeUnit.id} timeUnit={timeUnit}/>)

        const initialTimeUnitValue = <TimeUnitAnswer
            key={currentTimeAnswer}

            //the crucial information here is 'currentTimeAnswer' the rest is just for filling up the timeUnit type
                //todo: as length and end are unnecessary in this component, I could create new model type for this.
                //but eventually I need to adapt the backend aswell
            timeUnit={{
                time: currentTimeAnswer + "",
                length: 15,
                end: "24:00"
                }}
                />

       const QuestionTypeResolver = () => {
           if (props.question.question === "On which days do you work ?") {
               return (
                   <div>
                       <WorkdayCheckboxes workdays={workdays} setWorkdays={setWorkdays} />
                   </div>
               );
           }

           else{
               return(
                //create extra 'TimeSelection' component
               <FormControl>
                   <InputLabel>Time</InputLabel>
                   <Select
                       name={props.question.type}
                       id={props.question.id}
                       onChange={event => timeAnswerDbUpdate(Number(event.target.value))}
                   >
                        value={initialTimeUnitValue}
                        {filteredTimeUnitSelection}
                   </Select>

                    <Select
                        value={age}
                        onChange={event => setAge(event.target.value as string)}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
               </FormControl>
               );
           }
        };
        const [age, setAge] =useState('');

        const handleChange = (event: SelectChangeEvent) => {
          setAge(event.target.value as string);
        };
    return (
            <Grid2 size={8}>
                <Card sx={{
                    backgroundColor: "primary.main",
                    marginTop:'40px'
                    }}>
                    <Box textAlign='center' >
                    <Typography>{props.question.question}</Typography>
                    {errorMessage && <div>{errorMessage}</div>}
                    {QuestionTypeResolver()}
                    </Box>
                </Card>
            </Grid2>
    );
}