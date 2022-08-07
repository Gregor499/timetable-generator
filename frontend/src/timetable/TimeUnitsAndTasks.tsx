import "./TimeUnitsAndTasks.css"
import {TimeUnit} from "../service/models";
import {useState} from "react";

interface TimeTableProps {
    timeUnit: TimeUnit
    task: string
}

export default function TimeUnitsAndTasks(props: TimeTableProps) {
    return (
        <tr className="timeUnitsAndTasks">
            <th className="timeUnits">{props.timeUnit.time}</th>
            <th className={props.task}>{props.task}</th>
            <th className={props.task}>{props.task}</th>
            <th className={props.task}>{props.task}</th>
            <th className={props.task}>{props.task}</th>
            <th className={props.task}>{props.task}</th>
            <th></th>
            <th></th>
        </tr>
    )
}