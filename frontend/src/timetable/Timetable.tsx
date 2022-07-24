import "./Timetable.css"
import axios from "axios";
import {FormEvent, useEffect, useState} from "react";
import {loginUser, postTimeUnitCreationData} from "../service/apiService";
import {TimeUnit} from "../service/models";
import TimeUnits from "./TimeUnits";

export default function Timetable() {
    const [timeUnit, setTimeUnit] = useState("")
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        postTimeUnitCreationData()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("timeUnits do not load"));
    }, [])

    const timeUnits = timeUnitList.map(timeUnit => <TimeUnits timeUnit={timeUnit}/>
    )

    return (
        <div>
            <h1 className="headline">Timetable</h1>

            <table className= "table">
                <thead>
                <tr>
                    <th>Uhrzeit</th>
                    <th>Montag</th>
                    <th>Dienstag</th>
                    <th>Mittwoch</th>
                    <th>Donnerstag</th>
                    <th>Freitag</th>
                    <th>Samstag</th>
                    <th>Sonntag</th>
                </tr>
                </thead>

                <tbody>
                {timeUnits}
                </tbody>
            </table>
        </div>

    );
}