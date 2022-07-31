import "./Timetable.css"
import {useEffect, useState} from "react";
import {getTimeUnitList, postTimeUnitCreationData} from "../service/apiService";
import {TimeUnit} from "../service/models";
import TimeUnits from "./TimeUnits";
import AnswerProperties from "../questions/AnswerProperties";

export default function Timetable() {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    const maxStart = 8 * 60
    const maxEnd = 22 * 60

    const timeUnits = timeUnitList.map(timeUnit => {
            if (timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd) {
                return <TimeUnits key={timeUnit.id} timeUnit={timeUnit}/>;
            }
        }
    )

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