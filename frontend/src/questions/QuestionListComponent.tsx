import {Question, TimeAnswer, TimeUnit} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";
import "./QuestionListComponent.css"

interface QuestionProps {
    question: Question
    answers: Array<TimeAnswer>
    answerCallback: () => void
}

export default function QuestionListComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [currentTimeAnswer, setCurrentTimeAnswer] = useState<string>()

    const [errorMessage, setErrorMessage] = useState("")

    const setTimeAnswer = (questionId: string, question: string, timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: questionId,
            question: question,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .then(() => props.answerCallback())
            .catch(() => setErrorMessage("error posting answer"))
    }

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));

        const currentAnswer = props.answers.find(answer => answer.questionId === props.question.id)
        if (currentAnswer) {
            setCurrentTimeAnswer(currentAnswer.time!)
        } else {
            setCurrentTimeAnswer("XX:XX")
        }
    }, [props.answers, props.question.id])

    const timeUnitsToChoose = timeUnitList
        .filter(timeUnit => {
            if (!props.question.previousQuestionId) {
                return true;
            } else {
                const previousQuestionAnswer = props.answers.find(answer => answer.questionId === props.question.previousQuestionId)
                if (previousQuestionAnswer) {
                    const currentTimeAnswerInMinutes = (Number(currentTimeAnswer![0].charAt(0)) * 600 + Number(currentTimeAnswer![0].charAt(1)) * 60 + Number(currentTimeAnswer![0].charAt(3)) * 10
                        + Number(currentTimeAnswer![0].charAt(5)));
                    return (timeUnit.timeInMinutes! >= previousQuestionAnswer.timeInMinutes) && timeUnit.timeInMinutes !== currentTimeAnswerInMinutes;
                } else {
                    return true;
                }
            }
        })
        .map(timeUnit => <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>)

    return (
        <div className="question">
            <p>{props.question.question}</p>
            {errorMessage && <div>{errorMessage}</div>}
            <label htmlFor="time">Time: </label>

            <select className="questionAnswer" name={props.question.type} id={props.question.id}
                    onChange={event => setTimeAnswer(props.question.id, props.question.question, Number(event.target.value))}>

                value=<AnswerProperties key={currentTimeAnswer} timeUnit={{
                time: currentTimeAnswer + "",
                length: 15,
                end: "24:00"
            }}/>

                {timeUnitsToChoose}
            </select>
        </div>
    )
}