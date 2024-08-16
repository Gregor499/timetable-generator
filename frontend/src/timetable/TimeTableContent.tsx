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

const taskNameMapping: Record<string, string> = {
    morningSleep: "Sleep",
    nightSleep: "Sleep",
    morningRoutine: "Morning Routine",
    workWayTime: "Commute",
    work: "Work",
    leisureTime: "Leisure Time",
    eveningRoutine: "Evening Routine"
};

export default function TimeTableContent(props: TimeTableProps) {

    const taskName = taskNameMapping[props.task] || props.task;

    return (
        <tr className="timeTableContent">
            <th className="timeUnits">{props.timeUnit.time}</th>
            <th className={props.monday ? props.task : "free"}>{props.monday ? taskName : "free"}</th>
            <th className={props.tuesday ? props.task : "free"}>{props.tuesday ? taskName : "free"}</th>
            <th className={props.wednesday ? props.task : "free"}>{props.wednesday ? taskName : "free"}</th>
            <th className={props.thursday ? props.task : "free"}>{props.thursday ? taskName : "free"}</th>
            <th className={props.friday ? props.task : "free"}>{props.friday ? taskName : "free"}</th>
            <th className={props.saturday ? props.task : "free"}>{props.saturday ? taskName : "free"}</th>
            <th className={props.sunday ? props.task : "free"}>{props.sunday ? taskName : "free"}</th>
        </tr>
    )
}