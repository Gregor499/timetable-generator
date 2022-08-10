import "./TimeUnitsAndTasks.css"
import {TimeUnit} from "../service/models";

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
            <th className="weekend"></th>
            <th className="weekend"></th>
        </tr>
    )
}