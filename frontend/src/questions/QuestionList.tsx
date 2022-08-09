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

        {/*
            <p>3. How much time does it take you to get ready ?</p>
                <ul>
                    Estimate time for:
                    <li>personal hygiene(taking a shower, brushing your teeth, using deodorant)</li>
                        <li>daydreaming</li>
                        <li>breakfast, preparation for breakfast</li>
                        <li>washing your dishes, getting dressed</li>
                        <li>meditation, reading</li>
                </ul>
            <p>5. do you want to change your sleep habits on weekends ?</p>
            <p>6. which are your workdays
*/}

        <br/>
        <br/>

        <NavLink to={"/timetable"}>
            <button className="createButton">create</button>
        </NavLink>
    </div>

    </div>
)
}