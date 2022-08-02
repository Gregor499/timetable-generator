import {Question, TimeAnswer, TimeUnit} from "../service/models";
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeAnswer, postTimeUnitCreationData} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";
import axios from "axios";
import TimeUnits from "../timetable/TimeUnits";

interface QuestionProps {
    question: Question
    timeAnswer?: TimeAnswer
}

export default function QuestionComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [sleepEndAnswer, setSleepEndAnswer] = useState<number>(0)
    const [workStartAnswer, setWorkStartAnswer] = useState<number>(0)
    const [workEndAnswer, setWorkEndAnswer] = useState<number>(0)

    const setTimeAnswer = (questionId: string, timeInMinutes: number) => {
        const timeAnswer: TimeAnswer = {
            questionId: questionId,
            timeInMinutes: timeInMinutes
        }
        postTimeAnswer(timeAnswer)
            .catch(() => setErrorMessage("error posting answer"))

        if (timeAnswer.questionId == "62e12614a362100c83bb83ab") {
            setWorkStartAnswer(timeAnswer.timeInMinutes!)
        }
    }

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    const timeUnitsToChoose = timeUnitList.map(timeUnit => {
        if (props.question.type == "sleepEnd") {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        }
        if (props.question.type == "workStart" && timeUnit.timeInMinutes! >= sleepEndAnswer) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        }
        if (props.question.type == "workEnd" && timeUnit.timeInMinutes! >= workStartAnswer) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
        }
        if (props.question.type == "sleepStart" && timeUnit.timeInMinutes! >= workEndAnswer) {
            return <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>;
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