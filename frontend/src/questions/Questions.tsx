import {NavLink} from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import {getQuestionList, getTimeAnswer} from "../service/apiService";
import QuestionListComponent from "./QuestionComponent";
import {Question, TimeAnswer} from "../service/models";
import "./Questions.css"


export default function QuestionList() {

    const [questionList, setQuestionList] = useState<Array<Question>>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [answers, setAnswers] = useState<Array<TimeAnswer>>([])

    useEffect(() => {
        getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load"));
    }, [])

    const onAnswer = useCallback(() => {
/*         getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load")); */
        getTimeAnswer()
            .then(data => setAnswers(data))
            .catch(() => setErrorMessage("timeAnswer doesnt load"));
    }, []);

    const questions = questionList.sort((s1, s2) => s1.order - s2.order).map(question => <QuestionListComponent
            key={question.id} question={question} answers={answers} answerCallback={onAnswer}/>)

    return (
        <div className="body">
        <div className="questions">
            <h1 className="questionHeadline"> Questions:</h1>
            {errorMessage && <div>{errorMessage}</div>}
            {questions}

            <br/>
            <br/>

            <NavLink to={"/timetable"}>
                <button className="createButton">create</button>
            </NavLink>
        </div>

        </div>
    )
}