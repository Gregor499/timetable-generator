import {ProcessedTimeAnswer, TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
    task: string
}

export default function Task(props: TimeTableProps) {


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