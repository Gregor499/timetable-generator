import "./TimeUnits.css"
import {TimeUnit} from "../service/models";
import {useState} from "react";

interface TimeTableProps {
    timeUnit: TimeUnit
    task: string
}

export default function TimeUnits(props: TimeTableProps) {
    return (
        <tr>
            <th>{props.timeUnit.time}</th>
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