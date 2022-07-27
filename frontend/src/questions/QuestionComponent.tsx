import {Question, TimeUnit} from "../service/models";
import {useEffect, useState} from "react";
import {postAnswerType1, postTimeUnitCreationData} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";

interface QuestionProps {
    question: Question
}

export default function QuestionComponent(props: QuestionProps) {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [sleepLength, setSleepLength] = useState("")


    const answerType1 = (answerType1: string) => {
        postAnswerType1({sleepLength})
            .catch(() => setErrorMessage("error posting answer")
            )
    }

    useEffect(() => {
        postTimeUnitCreationData({
            "id": "00:00",
            "time": "00:00",
            "length": 5,
            "end": "24:00"
        })
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    const timeUnits = timeUnitList.map(timeUnit => <AnswerProperties key={timeUnit.id} timeUnit={timeUnit}/>
    )

    if (props.question.type == "time") {
        return (
            <div>
                <p>{props.question.question}</p>

                <label htmlFor="time">Time: </label>

                <select name="time" id="time" onChange={event => answerType1(event.target.value)}>
                    {timeUnits}
                </select>
            </div>
        )
    }

    if (props.question.type == "checkBox") {
        return (
            <div>
                <p>{props.question.question}</p>


            </div>
        )
    }

    else
        return (
            <div>
                <p>{props.question.question}</p>

                <label htmlFor="time">Time: </label>

                <select name="time" id="time" onChange={event => answerType1(event.target.value)}>
                    {timeUnits}
                </select>
            </div>
        )
}