import "./Timetable.css"
import {useEffect, useState} from "react";
import {getProcessAnswers, getTimeUnitList} from "../service/apiService";
import {ProcessedAnswer, TimeUnit} from "../service/models";
import TimeUnits from "./TimeUnits";

interface TimeTableProps {
    timeUnit: TimeUnit
    processedAnswer?: ProcessedAnswer
}

export default function Timetable() {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [processedAnswerList, setProcessedAnswerList] = useState<Array<ProcessedAnswer>>([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));

        getProcessAnswers()
            .then(data => setProcessedAnswerList(data))
            .catch(() => setErrorMessage("processedAnswerList does not load"));
    }, [])


    const maxStart = 0 * 60
    const maxEnd = 24 * 60

    const timeUnits = timeUnitList.map(timeUnit => {
        if (timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd) {
                    return <TimeUnits key={timeUnit.id} timeUnit={timeUnit} workAnswer={processedAnswerList[0]} sleepMorningAnswer={processedAnswerList[1]} sleepNightAnswer={processedAnswerList[2]}/>;
        }
    })

        return (
            <div>
                <h1 className="headline">Timetable</h1>

                <table className="table">
                    <thead>
                    <tr>
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
                    {timeUnits}

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

        );
    }