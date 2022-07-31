import {Question, TimeAnswer, TimeUnit} from "../service/models";
import {useEffect, useState} from "react";
import {postTimeAnswer, postTimeUnitCreationData} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";
import axios from "axios";

interface QuestionProps {
    question: Question
    timeAnswer?: TimeAnswer
}

export default function QuestionComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")

    const setTimeAnswer = (questionId: string, time: string) => {

            const timeAnswer: TimeAnswer = {
                questionId: questionId,
                time: time
            }

        postTimeAnswer(timeAnswer)
            .catch(() => setErrorMessage("error posting answer")
            )
    }

    useEffect(() => {
        postTimeUnitCreationData({
            "time": "00:00",
            "length": 5,
            "end": "24:00"
        })
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    const maxStart = 4.5 * 60
    const maxEnd = 10 * 60

    const timeUnits = timeUnitList.map(timeUnit => {
        if (props.question.type == "workStart" && timeUnit.timeInMinutes! <= maxStart) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        }
        if (props.question.type == "workEnd" && timeUnit.timeInMinutes! <= maxEnd && timeUnit.timeInMinutes! >= maxStart) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        }
    })

    return (
        <div>
            <p>{props.question.question}</p>

            <label htmlFor="time">Time: </label>

            <select name={props.question.type} id={props.question.id} onChange={event => setTimeAnswer(props.question.id, event.target.value)}>
                {timeUnits}
            </select>
        </div>
    )
}