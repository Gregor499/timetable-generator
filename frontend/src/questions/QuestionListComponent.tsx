import {Question, TimeAnswer, TimeUnit, WorkdayAnswer} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer, postWorkdayAnswer} from "../service/apiService";
import TimeAnswerProperties from "./TimeAnswerProperties";

interface QuestionProps {
    question: Question
    answers: Array<TimeAnswer>
    answerCallback: () => void
}

export default function QuestionListComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [currentTimeAnswer, setCurrentTimeAnswer] = useState<string>()
    const [workdays, setWorkdays] = useState<boolean[]>(Array(7).fill(false));
    const [errorMessage, setErrorMessage] = useState("")

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
        setCurrentTimeAnswer(currentAnswer ? currentAnswer.time : "XX:XX");
    }, [props.answers, props.question.id])

    const setTimeAnswer = (timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: props.question.id,
            question: props.question.question,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .then(() => props.answerCallback())
            .catch(() => {
                console.error("Error posting time answer:", Error);
                setErrorMessage("error posting answer");
                })
    };


    const handleSubmit = () => {
                const workdayAnswer: WorkdayAnswer = {
                    questionId: props.question.id,
                    question: props.question.question,
                    monday: workdays[0],
                    tuesday: workdays[1],
                    wednesday: workdays[2],
                    thursday: workdays[3],
                    friday: workdays[4],
                    saturday: workdays[5],
                    sunday: workdays[6],
                };

        postWorkdayAnswer(workdayAnswer)
            .then(() => props.answerCallback())
            .catch(() => {
                console.error("Error posting workday answer:", Error);
                setErrorMessage("error posting answer");
                })
    };

    const convertTimeToMinutes = (time: string | undefined): number => {
        if(!time) return 0;
        const parts = time.split(":");
        return (Number(parts[0]) * 60) + Number(parts[1]);
        };

    const timeUnitsToChoose = timeUnitList
        .filter(timeUnit => {
            if (!props.question.previousQuestionId) {
                return true;
            } else {
                const previousQuestionAnswer = props.answers.find(answer => answer.questionId === props.question.previousQuestionId)
                if (previousQuestionAnswer) {
                    const currentTimeAnswerInMinutes = convertTimeToMinutes(currentTimeAnswer);
                    return (
                        timeUnit.timeInMinutes! >= previousQuestionAnswer.timeInMinutes) &&
                        timeUnit.timeInMinutes !== currentTimeAnswerInMinutes;
                } else {
                    return true;
                }
            }
        })
        .map(timeUnit => <TimeAnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>)

       const renderWorkdayCheckboxes = () => {
           const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
           return days.map((day, index) => (
               <span key={index}>
                   <input
                       type="checkbox"
                       id={`check${index}`}
                       checked={workdays[index]}
                       onChange={event => {
                           const newWorkdays = [...workdays];
                           newWorkdays[index] = event.target.checked;
                           setWorkdays(newWorkdays);
                       }}
                   />
                   <label htmlFor={`check${index}`}>{day}</label>
               </span>
           ));
       };

       const QuestionType = () => {
           if (props.question.question === "On which days do you work ?") {
               return (
                   <div>
                       {renderWorkdayCheckboxes()}
                       <button className="submit" onClick={handleSubmit}>Submit</button>
                   </div>
               );
           }

           else{
               return(
               <div>
                   <select
                       className="questionAnswer text-black/80 text-base border border-black rounded-lg"
                       name={props.question.type}
                       id={props.question.id}
                       onChange={event => setTimeAnswer(Number(event.target.value))}
                   >
                              value=<TimeAnswerProperties
                              key={currentTimeAnswer}
                              timeUnit={{
                                time: currentTimeAnswer + "",
                                length: 15,
                                 end: "24:00"
                              }}
                              />
                              {timeUnitsToChoose}
                   </select>
               </div>
               );
           }
        };

    return (
        <div className="question border border-black bg-blue-300/60 font-roboto text-xl p-2 h-[5%] w-[60%] mx-auto text-center mt-12 mb-1.5">
            <p>{props.question.question}</p>
            {errorMessage && <div>{errorMessage}</div>}
            {QuestionType()}
        </div>
    );
}