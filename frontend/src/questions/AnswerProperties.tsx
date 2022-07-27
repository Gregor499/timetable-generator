import {TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
}

export default function AnswerProperties(props: TimeTableProps) {

    return (
    <option value={props.timeUnit.time}>{props.timeUnit.time}h</option>
    )
}