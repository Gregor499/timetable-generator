import "./TimeUnits.css"
import {ProcessedAnswer, TimeUnit} from "../service/models";

interface TimeTableProps {
    timeUnit: TimeUnit
    workAnswer?: ProcessedAnswer
    sleepMorningAnswer?: ProcessedAnswer
    sleepNightAnswer?: ProcessedAnswer
}

export default function TimeUnits(props: TimeTableProps) {
    const isOccupiedByWork = props.workAnswer?.timeList.includes(props.timeUnit.time)
    const isOccupiedByMorningSleep = props.sleepMorningAnswer?.timeList.includes(props.timeUnit.time)
    const isOccupiedByNightSleep = props.sleepNightAnswer?.timeList.includes(props.timeUnit.time)


    return (
        <tr>
            <th>{props.timeUnit.time}</th>
            <th className={isOccupiedByWork ? props.workAnswer?.task : ""}>{isOccupiedByWork ? props.workAnswer?.task : ""}{isOccupiedByMorningSleep ? props.sleepMorningAnswer?.task : ""}{isOccupiedByNightSleep ? props.sleepNightAnswer?.task : ""}</th>
            <th className={isOccupiedByWork ? props.workAnswer?.task : ""}>{isOccupiedByWork ? props.workAnswer?.task : ""}{isOccupiedByMorningSleep ? props.sleepMorningAnswer?.task : ""}{isOccupiedByNightSleep ? props.sleepNightAnswer?.task : ""}</th>
            <th className={isOccupiedByWork ? props.workAnswer?.task : ""}>{isOccupiedByWork ? props.workAnswer?.task : ""}{isOccupiedByMorningSleep ? props.sleepMorningAnswer?.task : ""}{isOccupiedByNightSleep ? props.sleepNightAnswer?.task : ""}</th>
            <th className={isOccupiedByWork ? props.workAnswer?.task : ""}>{isOccupiedByWork ? props.workAnswer?.task : ""}{isOccupiedByMorningSleep ? props.sleepMorningAnswer?.task : ""}{isOccupiedByNightSleep ? props.sleepNightAnswer?.task : ""}</th>
            <th className={isOccupiedByWork ? props.workAnswer?.task : ""}>{isOccupiedByWork ? props.workAnswer?.task : ""}{isOccupiedByMorningSleep ? props.sleepMorningAnswer?.task : ""}{isOccupiedByNightSleep ? props.sleepNightAnswer?.task : ""}</th>
            <th></th>
            <th></th>
        </tr>
    )
}