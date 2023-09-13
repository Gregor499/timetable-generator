import "./TimeTableContent.css"
import {TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
    task: string
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
}

export default function TimeTableContent(props: TimeTableProps) {

    return (
        <tr className="timeTableContent">
            <th className="timeUnits">{props.timeUnit.time}</th>
            <th className={props.monday ? props.task : "free"}>{props.monday ? props.task : "free"}</th>
            <th className={props.tuesday ? props.task : "free"}>{props.tuesday ? props.task : "free"}</th>
            <th className={props.wednesday ? props.task : "free"}>{props.wednesday ? props.task : "free"}</th>
            <th className={props.thursday ? props.task : "free"}>{props.thursday ? props.task : "free"}</th>
            <th className={props.friday ? props.task : "free"}>{props.friday ? props.task : "free"}</th>
            <th className={props.saturday ? props.task : "free"}>{props.saturday ? props.task : "free"}</th>
            <th className={props.sunday ? props.task : "free"}>{props.sunday ? props.task : "free"}</th>
        </tr>
    )
}