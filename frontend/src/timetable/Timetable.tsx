import "./Timetable.css"
import {useEffect, useState} from "react";
import {getProcessedTimeAnswers, getTimeUnitList} from "../service/apiService";
import {ProcessedTimeAnswer, TimeUnit} from "../service/models";
import TimeUnitsAndTasks from "./TimeUnitsAndTasks";

export default function Timetable() {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [processedTimeAnswerList, setProcessedTimeAnswerList] = useState<Array<ProcessedTimeAnswer>>([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));

        getProcessedTimeAnswers()
            .then(data => setProcessedTimeAnswerList(data))
            .catch(() => setErrorMessage("processedAnswerList does not load"));


    }, [])
    let maxStart = 0
    let maxEnd = 24 * 60

    processedTimeAnswerList.forEach(processedTimeAnswer => {
        if (processedTimeAnswer.task.includes("morningSleep")) {
            maxStart = (Number(processedTimeAnswer.timeList[0].charAt(0)) * 600 + Number(processedTimeAnswer.timeList[0].charAt(1)) * 60 + Number(processedTimeAnswer.timeList[0].charAt(3)) * 10
                + Number(processedTimeAnswer.timeList[0].charAt(5)))
        }
        if (processedTimeAnswer.task.includes("nightSleep")) {
            maxEnd = (Number(processedTimeAnswer.timeList[processedTimeAnswer.timeList.length - 1].charAt(0)) * 600
                + Number(processedTimeAnswer.timeList[processedTimeAnswer.timeList.length - 1].charAt(1)) * 60
                + Number(processedTimeAnswer.timeList[processedTimeAnswer.timeList.length - 1].charAt(3)) * 10
                + Number(processedTimeAnswer.timeList[processedTimeAnswer.timeList.length - 1].charAt(5)))
        }
    })

    const timeUnitsAndTasks = timeUnitList
        .filter(timeUnit => timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd)
        .map(timeUnit => {
            let task = ""

            processedTimeAnswerList.forEach(processedTimeAnswer => {
                processedTimeAnswer.timeList.forEach(time => {
                    if (time.includes(timeUnit.time)) {
                        task = (processedTimeAnswer.task)
                    }
                })
            })
            return <TimeUnitsAndTasks key={timeUnit.id} timeUnit={timeUnit} task={task}/>
        })

    return (
        <>
            <h1 className="headline">Timetable</h1>
            <div className="flex-container">
                <table className="table">
                    <thead>
                    <tr className="flex-item">
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    </thead>

                    <tbody>
                    {timeUnitsAndTasks}

                    {errorMessage && <tr>
                        <th>{errorMessage}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>}
                    </tbody>
                </table>
            </div>
        </>

    );
}