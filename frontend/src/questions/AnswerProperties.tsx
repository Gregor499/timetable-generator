import {TimeUnit} from "../service/models";

interface AnswerProps {
    timeUnit: TimeUnit
}

export default function AnswerProperties(props: AnswerProps) {

    return (
    <option value={props.timeUnit.timeInMinutes}>{props.timeUnit.time}h</option>
    )
}