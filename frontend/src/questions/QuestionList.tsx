import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestionList, getTimeAnswer} from "../service/apiService";
import QuestionListComponent from "./QuestionListComponent";
// import {setWorkdayAnswer} from "./QuestionListComponent";
import {Question, TimeAnswer} from "../service/models";

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
    <div className="body w-full mx-auto bg-yellow-300/45 flex flex-col justify-stretch">
    <div className="questions w-[70%] mx-auto">
        <h1 className="questionHeadline mx-auto mt-8 w-[50%] p-2 text-4xl underline text-center font-roboto-light"> Questions:</h1>
        {errorMessage && <div>{errorMessage}</div>}
        {questions}

        <br/>
        <br/>

        <NavLink to={"/timetable"}>
            <button className="createButton text-black/80 text-base w-full h-16 mx-auto mb-12 mt-5 bg-red-400 text-3xl font-roboto-light border border-gray-500">create</button>
        </NavLink>
    </div>

    </div>
)
}