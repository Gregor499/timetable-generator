import "./Timetable.css"
import {useEffect, useState} from "react";
import {getProcessedTimeAnswers, getTimeUnitList} from "../service/apiService";
import {ProcessedTimeAnswer, TimeUnit} from "../service/models";
import TimeTableContent from "./TimeTableContent";
import {convertTimeUnitToMinutes} from "../utilities/Util"

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
    }, []);

    const convertTimeUnitToMinutes = (timeUnit: string | undefined) => {
        if(!timeUnit) return 0;
        const [hours, minutes] = timeUnit.split(":").map(Number);
        return hours * 60 + minutes;
    };

    let maxStart = 0
    let maxEnd = 24 * 60

    processedTimeAnswerList.forEach(processedTimeAnswer => {
        if (processedTimeAnswer.task.includes("morningSleep")) {
            maxStart = convertTimeUnitToMinutes(processedTimeAnswer.timeList[0])
        }
        if (processedTimeAnswer.task.includes("nightSleep")) {
            maxEnd = convertTimeUnitToMinutes(processedTimeAnswer.timeList[processedTimeAnswer.timeList.length - 1])
        }
    })

    const timeTableContent = timeUnitList
        .filter(timeUnit => timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd)
        .map(timeUnit => {
            let task = ""
            let monday: boolean = false
            let tuesday: boolean = false
            let wednesday: boolean = false
            let thursday: boolean = false
            let friday: boolean = false
            let saturday: boolean = false
            let sunday: boolean = false

            processedTimeAnswerList.forEach(processedTimeAnswer => {
                processedTimeAnswer.timeList.forEach(time => {
                    if (time.includes(timeUnit.time)) {
                        task = (processedTimeAnswer.task)
                        monday = (processedTimeAnswer.monday)
                        tuesday = (processedTimeAnswer.tuesday)
                        wednesday = (processedTimeAnswer.wednesday)
                        thursday = (processedTimeAnswer.thursday)
                        friday = (processedTimeAnswer.friday)
                        saturday = (processedTimeAnswer.saturday)
                        sunday = (processedTimeAnswer.sunday)
                    }
                })
            })
            return <TimeTableContent
                        key={timeUnit.id}
                        timeUnit={timeUnit}
                        task={task}
                        monday={monday}
                        tuesday={tuesday}
                        wednesday={wednesday}
                        thursday={thursday}
                        friday={friday}
                        saturday = {saturday}
                        sunday = {sunday}
                   />
        })

    return (
        <>
            <h1 className="headline">Timetable</h1>
            <div className="flex-container">
                <table className="table">
                    <thead>
                    <tr className="flex-item">
                        <th className="timeUnits">Time</th>
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
                    {timeTableContent}

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