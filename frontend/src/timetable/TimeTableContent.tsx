//import "./TimeTableContent.css"
import {TimeUnit} from "../service/models";
import { TableCell, TableRow } from '@mui/material';

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

const tableRowStyles = {
    background: 'rgba(255, 158, 0, 0.68)',
    padding: '5px',
    width: '80%',
    marginTop: '10px',
    lineHeight: '15px',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1em',
    textAlign: 'center',
};


const tableCellStyles: Record<string, { backgroundColor: string; textAlign?: string; height?: string; padding?: string }> = {
    morningSleep: { backgroundColor: 'rgba(134, 134, 134, 0.3)', textAlign: 'center' },
    morningRoutine: { backgroundColor: 'rgba(142, 255, 148, 0.71)', textAlign: 'center' },
    workWayTime: { backgroundColor: 'rgba(48, 163, 255, 0.51)', textAlign: 'center' },
    work: { backgroundColor: 'rgba(17, 128, 255, 0.65)', textAlign: 'center' },
    leisureTime: { backgroundColor: 'rgba(255, 228, 11, 0.64)', textAlign: 'center' },
    eveningRoutine: { backgroundColor: 'rgba(148, 85, 255, 0.5)', textAlign: 'center' },
    nightSleep: { backgroundColor: 'rgba(134, 134, 134, 0.3)', textAlign: 'center' },
    free: { backgroundColor: 'rgba(255, 158, 0, 0.68)', textAlign: 'center', height: '30px', padding: '4px' },
};

export default function TimeTableContent(props: TimeTableProps) {
    const taskName = taskNameMapping[props.task] || props.task;

    return (
        <TableRow sx={tableRowStyles} className="timeTableContent">
            <TableCell className="timeUnits">{props.timeUnit.time}</TableCell>
            <TableCell sx={props.monday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.monday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.tuesday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.tuesday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.wednesday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.wednesday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.thursday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.thursday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.friday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.friday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.saturday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.saturday ? taskName : "free"}
            </TableCell>
            <TableCell sx={props.sunday ? tableCellStyles[props.task] : tableCellStyles.free}>
                {props.sunday ? taskName : "free"}
            </TableCell>
        </TableRow>
    );
}