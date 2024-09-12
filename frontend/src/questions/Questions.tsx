import {NavLink} from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import {getQuestionList, getTimeAnswer, processAndGetProcessedTimeAnswers} from "../service/apiService";
import QuestionManager from "./QuestionManager";
import {Question, TimeAnswer} from "../service/models";
import "./Questions.css"
import { Button, Box, Container, Typography, Grid2, AppBar, Toolbar } from '@mui/material';
import { AccessAlarm } from "@mui/icons-material";


export default function QuestionList() {

    const [questionList, setQuestionList] = useState<Array<Question>>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [answers, setAnswers] = useState<Array<TimeAnswer>>([])

    useEffect(() => {
        getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("Question database entries do not load, you might not be logged in"));
    }, [])

    const onAnswer = useCallback(() => {
/*         getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load")); */
        getTimeAnswer()
            .then(data => setAnswers(data))
            .catch(() => setErrorMessage("timeAnswer doesnt load"));
    }, []);

    const sortedQuestions = questionList.sort((s1, s2) => s1.order - s2.order).map(question => <QuestionManager
            key={question.id} question={question} answers={answers} answerCallback={onAnswer}/>)

    const processAnswers = () => {
        processAndGetProcessedTimeAnswers()
            .then(() => window.location.href = '/timetable')
            .catch(() => setErrorMessage("Error while processing Answers:\nCheck if one is missing or falsely set !"));
    }

    return (
        <Box sx={{ backgroundColor: '#DAA520', minHeight: '100vh' }}>
            <Container disableGutters>
                <Box textAlign='center'>
                    <AppBar position='static'>
                        <Toolbar>
                            <AccessAlarm/>
                            <Typography variant="h6" textAlign={'center'} sx={{ textDecoration: 'none' }}>Timetable Generator</Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box textAlign='center'>
                    <Typography variant="h2" gutterBottom>Questions:</Typography>
                </Box>            {errorMessage && <div>{errorMessage}</div>}
                <Grid2 container spacing={0.5} justifyContent={"center"}>
                {sortedQuestions}
                </Grid2>

                <br/>
                <br/>
                <Box textAlign='center' sx={{ pb: '5%' }}>
                    <Button onClick={processAnswers} variant='contained'>create</Button>
                </Box>
            </Container>
        </Box>
    )
}