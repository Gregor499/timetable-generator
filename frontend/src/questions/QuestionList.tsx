import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestionList, getTimeAnswer} from "../service/apiService";
import QuestionListComponent from "./QuestionListComponent";
import {Question, TimeAnswer} from "../service/models";
import "./QuestionList.css"


export default function QuestionList() {

    const [questionList, setQuestionList] = useState<Array<Question>>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [allAnswers, setAllAnswers] = useState<Array<TimeAnswer>>([])

    useEffect(() => {
        getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load"));
    }, [])

    const onAnswer = () => {
        getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load"));
        getTimeAnswer()
            .then(data => setAllAnswers(data))
            .catch(() => setErrorMessage("timeAnswer doesnt load"));
    }

    const questions = questionList.sort((s1, s2) => s1.order - s2.order).map(question => <QuestionListComponent
            key={question.id} question={question} answers={allAnswers} answerCallback={onAnswer}/>)

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