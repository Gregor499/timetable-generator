import "./TimeTableContent.css"
import {TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
    task: string
    workday: boolean
}

export default function TimeTableContent(props: TimeTableProps) {

    return (
        <tr className="timeTableContent">
            <th className="timeUnits">{props.timeUnit.time}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
            <th className={props.workday ? props.task : "free"}>{props.workday ? props.task : "free"}</th>
        </tr>
    )
}