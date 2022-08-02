import "./TimeUnits.css"
import {ProcessedAnswer, TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
    processedAnswer?: ProcessedAnswer
}

export default function TimeUnits(props: TimeTableProps) {
     const isOccupied = props.processedAnswer?.timeList.includes(props.timeUnit.time)
return (
    <tr>
        <th>{props.timeUnit.time}</th>
        <th className={isOccupied? props.processedAnswer?.task:""}>{props.processedAnswer?.task}</th>
        <th className={isOccupied? props.processedAnswer?.task:""}>{props.processedAnswer?.task}</th>
        <th className={isOccupied? props.processedAnswer?.task:""}>{props.processedAnswer?.task}</th>
        <th className={isOccupied? props.processedAnswer?.task:""}>{props.processedAnswer?.task}</th>
        <th className={isOccupied? props.processedAnswer?.task:""}>{props.processedAnswer?.task}</th>
        <th>{props.processedAnswer?.task}</th>
        <th>{props.processedAnswer?.task}</th>
    </tr>
)
}