import {TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
}

export default function TimeUnits(props: TimeTableProps) {

    return (
        <tr>
            <th>{props.timeUnit.time}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    )
}