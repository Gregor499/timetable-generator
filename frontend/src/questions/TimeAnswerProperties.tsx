import {TimeUnit} from "../service/models";

interface AnswerProps {
    timeUnit: TimeUnit
}

export default function TimeAnswerProperties(props: AnswerProps) {

    return (
    <option value={props.timeUnit.timeInMinutes}>{props.timeUnit.time}h</option>
    )
}