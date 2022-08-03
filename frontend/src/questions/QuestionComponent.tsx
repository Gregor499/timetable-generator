import {Question, TimeAnswer, TimeUnit} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";

interface QuestionProps {
    question: Question
    answers: Array<TimeAnswer>
    answerCallback: () => void
}
//test
export default function QuestionComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")

    const setTimeAnswer = (questionId: string, timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: questionId,
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
    }, [])

    const timeUnitsToChoose = timeUnitList.map(timeUnit => {
        if (!props.question.previousQuestionId) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        } else {
            const previousQuestionAnswer = props.answers.find(answer => answer.questionId === props.question.previousQuestionId)
            if(previousQuestionAnswer){
                if(timeUnit.timeInMinutes! >= previousQuestionAnswer.timeInMinutes){
                    return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
                }
            } else {
                return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;

            }
        }

    })

    return (
        <div id="test">
            <p>{props.question.question}</p>

            <label htmlFor="time">Time: </label>

            <select name={props.question.type} id={props.question.id}
                    onChange={event => setTimeAnswer(props.question.id, Number(event.target.value))}>
                {timeUnitsToChoose}
            </select>
        </div>
    )
}