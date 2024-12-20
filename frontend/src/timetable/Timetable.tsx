import "./Timetable.css"
import { useEffect, useState } from "react";
import { getProcessedTimeAnswers, getTimeUnitList } from "../service/apiService";
import { ProcessedTimeAnswer, TimeUnit } from "../service/models";
import TimeTableContent from "./TimeTableContent";
import { convertTimeUnitToMinutes } from "../utilities/Util"
import { usePDF } from "react-to-pdf";
import { Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid2 } from '@mui/material';
import Header from "../components/Header";

export default function Timetable() {
    const [timeUnitList, setTimeUnitList] = useState<Array<TimeUnit>>([])
    const [processedTimeAnswerList, setProcessedTimeAnswerList] = useState<Array<ProcessedTimeAnswer>>([])
    const [errorMessage, setErrorMessage] = useState("")
    
    const { toPDF, targetRef } = usePDF({filename: 'timetable.pdf'});

    useEffect(() => {
        getTimeUnitList()
            .then(data => setTimeUnitList(data))
            .catch(() => setErrorMessage("Error in loading TimeUnit list :\nCheck if the backend is running and reload page !"));

        getProcessedTimeAnswers()
            .then(data => setProcessedTimeAnswerList(data))
            .catch(() => setErrorMessage("Error while processing Answers:\nCheck if one is missing or falsely set !"));
    }, []);



const [maxStart, maxEnd] = calculateTimeRange(processedTimeAnswerList);
const timeTableContent = generateTimeTableContent(timeUnitList, processedTimeAnswerList, maxStart, maxEnd);

const tableStyles = {
    textAlign: 'center',
    border: 'thin solid',
    width: '100px', // Set a fixed width for the table cells
    height: '30px', // Set a fixed height for the table cells
    padding: '4px', // Adjust padding to fit the smaller height
};

//refactor TableCell to avoid redundancy
  return (
    <Box sx={{ backgroundColor: '#DAA520', minHeight: '100vh' }}>
        <Container disableGutters>
            <Header/>
            <Box textAlign='center'>
                <Typography variant="h2" gutterBottom>Timetable</Typography>
            </Box>
            <Grid2 container spacing={{ xs: 1, sm: 2, md: 3 }} direction="row" justifyContent="center" alignItems="center">
                <Grid2 size={2.5}>
                    <Box textAlign='center' justifyContent="center" gap={2}>
                        <Button onClick={() => toPDF()} variant="contained"  sx={{ whiteSpace:'nowrap'}}>
                            Download screenshot
                        </Button>
                    </Box>
                </Grid2>
                <Grid2 size={2.5}>
                    <Box textAlign='center' justifyContent="center" gap={2}>
                        <Button variant='contained' href='/' sx={{ whiteSpace:'nowrap'}}>
                            Back to Startpage
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, px:4 }}>
            <TableContainer  ref={targetRef} component={Paper}  sx={{ mb: '5%' }}>
                <Table size="small" >
                <TableHead>
                    <TableRow sx={{background: 'rgba(255, 158, 0, 1)'}}>
                        <TableCell sx={tableStyles} className="timeUnits">Time</TableCell>
                        <TableCell sx={tableStyles}>Monday</TableCell>
                        <TableCell sx={tableStyles}>Tuesday</TableCell>
                        <TableCell sx={tableStyles}>Wednesday</TableCell>
                        <TableCell sx={tableStyles}>Thursday</TableCell>
                        <TableCell sx={tableStyles}>Friday</TableCell>
                        <TableCell sx={tableStyles}>Saturday</TableCell>
                        <TableCell sx={tableStyles}>Sunday</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {timeTableContent}
                {errorMessage && (
                    <TableRow sx={{background: '#FC3442'}}>
                        <TableCell sx={tableStyles} colSpan={8}>{errorMessage}</TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </Container>
    </Box>

    );
}

function calculateTimeRange(processedTimeAnswerList: ProcessedTimeAnswer[]) {
        let maxStart = 0;
        let maxEnd = 24 * 60;

        processedTimeAnswerList.forEach(({ task, timeList }) => {
            if (task.includes("morningSleep")) {
                maxStart = convertTimeUnitToMinutes(timeList[0])
            }
            if (task.includes("nightSleep")) {
                maxEnd = convertTimeUnitToMinutes(timeList[timeList.length - 1])
            }
        })
        return [maxStart, maxEnd];
    }

function generateTimeTableContent(
    timeUnitList: TimeUnit[],
    processedTimeAnswerList: ProcessedTimeAnswer[],
    maxStart: number,
    maxEnd: number
    ) {
    return timeUnitList
            .filter(timeUnit => timeUnit.timeInMinutes! >= maxStart && timeUnit.timeInMinutes! <= maxEnd)
            .map(timeUnit => {
                const matchingAnswer = findMatchingAnswer(timeUnit.time, processedTimeAnswerList);

                return <TimeTableContent
                            key={timeUnit.id}
                            timeUnit={timeUnit}
                            task={matchingAnswer?.task || ""}
                            monday={matchingAnswer?.monday || false}
                            tuesday={matchingAnswer?.tuesday || false}
                            wednesday={matchingAnswer?.wednesday || false}
                            thursday={matchingAnswer?.thursday || false}
                            friday={matchingAnswer?.friday || false}
                            saturday = {matchingAnswer?.saturday || false}
                            sunday = {matchingAnswer?.sunday || false}
                       />
            });
    }


// Find the processed answer that matches the current time unit
function findMatchingAnswer(time: string, processedTimeAnswerList: ProcessedTimeAnswer[]) {
    for (const processedTimeAnswer of processedTimeAnswerList) {
        if (processedTimeAnswer.timeList.includes(time)){
            return processedTimeAnswer;
           }
    }
    return null;

}