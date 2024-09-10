import { TimeUnit } from "../service/models";
import { MenuItem } from '@mui/material';

interface AnswerProps {
    timeUnit: TimeUnit
}

export default function TimeUnitAnswer(props: AnswerProps) {

    return (
    <MenuItem key={props.timeUnit.timeInMinutes} value={props.timeUnit.timeInMinutes}>{props.timeUnit.time}h</MenuItem>
    )
}