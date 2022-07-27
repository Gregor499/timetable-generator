import {NavLink} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {getQuestionList} from "../service/apiService";
import AnswerProperties from "./AnswerProperties";
import QuestionComponent from "./QuestionComponent";
import {Question, TimeUnit} from "../service/models";

export default function QuestionList() {

    const [questionList, setQuestionList] = useState<Array<Question>>([])
    const [errorMessage, setErrorMessage] = useState("")


    /*    const questionAnswerType1 = (answerType1: string) => {
            postAnswerType1({sleepLength})
                .catch(() => setTimeError("time must be written in 'xx:xx' format")
                )
        }*/

    useEffect(() => {
        getQuestionList()
            .then(data => setQuestionList(data))
            .catch(() => setErrorMessage("questionList doesnt load"));
    }, [])

    const questions = questionList.map(question => <QuestionComponent key={question.id} question={question}/>
    )

    return (
        <div>
            <h1> Questions:</h1>
            {questions}

            {/*            <p>2. When does your need work start ?</p>

            <form  onSubmit={question2Input}>
                <input type="text" value={workStartTime} onChange={event => setWorkStartTime(event.target.value)} placeholder="start time in xx:xx format"/>
                <input type="submit" value="enter"/>
                {timeError && <div>{timeError}</div>}
            </form>

            <p>3. How much time does it take you to get ready ?</p>

                <form  onSubmit={question3Input}>
                    <input type="text" value={preparationTimeMorning} onChange={event => setPreparationTimeMorning(event.target.value)} placeholder="preparation time length in xx:xx format"/>
                    <input type="submit" value="enter"/>
                    {timeError && <div>{timeError}</div>}
                </form>

                <ul>
                    Estimate time for:
                    <li>personal hygiene(taking a shower, brushing your teeth, using deodorant)</li>
                        <li>daydreaming</li>
                        <li>breakfast, preparation for breakfast</li>
                        <li>washing your dishes, getting dressed</li>
                        <li>meditation, reading</li>
                </ul>

            <p>4. How long does it take you to get to work ?</p>

            <form  onSubmit={question4Input}>
                <input type="text" value={workWayTime} onChange={event => setWorkWayTime(event.target.value)} placeholder="arrival time in xx:xx format"/>
                <input type="submit" value="enter"/>
                {timeError && <div>{timeError}</div>}
            </form>*/}


            {/*

            <p>5. do you want to change your sleep habits on weekends ?</p>
            <p>6. which are your workdays
*/}

            <br/>
            <br/>

            <NavLink to={"/timetable"}>
                <button>create</button>
            </NavLink>
        </div>
    )
}