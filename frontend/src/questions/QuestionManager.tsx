import {Question, TimeAnswer, TimeUnit, WorkdayAnswer} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer, postWorkdayAnswer} from "../service/apiService";
import {convertTimeUnitToMinutes} from "../utilities/Util"
import WorkdayCheckboxes from "../components/WorkdayCheckboxes";
import { Select, FormControl, Box, Typography, Grid2, Card, InputLabel, MenuItem } from '@mui/material';

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
        if (question.question === "On which days do you work ?") {
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
        }
    
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
        .map(timeUnit =>
            <MenuItem key={timeUnit.id} value={convertTimeUnitToMinutes(timeUnit.time)}>{
                timeUnit.time}h
            </MenuItem>)

        const initialTimeUnitValue =
            <MenuItem
                key={`initial-${currentTimeAnswer}`} // Ensure unique key
                value={convertTimeUnitToMinutes(currentTimeAnswer)}>
                    {currentTimeAnswer}h
                </MenuItem>

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
                //move extra 'TimeSelection' component if necessary
               <FormControl>
                   <InputLabel>Time</InputLabel>
                   <Select
                       name={props.question.type}
                       id={props.question.id}
                       onChange={event => timeAnswerDbUpdate(Number(event.target.value))}
                       value={convertTimeUnitToMinutes(currentTimeAnswer)}
                   >
                        {[initialTimeUnitValue, ...filteredTimeUnitSelection]}

                   </Select>

                    
               </FormControl>
               );
           }
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