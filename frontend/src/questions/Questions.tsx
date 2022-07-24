import {NavLink} from "react-router-dom";
import {FormEvent, useState} from "react";
import axios from "axios";
import {postQ1Answer, postQ2Answer, postQ3Answer, postQ4Answer} from "../service/apiService";

export default function Questions() {

    const [sleepLength, setSleepLength] = useState("")
    const [timeError, setTimeError] = useState("")
    const [workStartTime, setWorkStartTime] = useState("")
    const [preparationTimeMorning, setPreparationTimeMorning] = useState("")
    const [workWayTime, setWorkWayTime] = useState("")


    const question1Input = (ev: FormEvent) => {
        ev.preventDefault()
            postQ1Answer({sleepLength})
                .catch(() => setTimeError("time must be written in 'xx:xx' format")
    )}


    const question2Input = (ev: FormEvent) => {
        ev.preventDefault()
        postQ2Answer({workStartTime})
            .catch(() => setTimeError("time must be written in 'xx:xx' format")
            )}

    const question3Input = (ev: FormEvent) => {
        ev.preventDefault()
        postQ3Answer({preparationTimeMorning})
            .catch(() => setTimeError("time must be written in 'xx:xx' format")
            )}

    const question4Input = (ev: FormEvent) => {
        ev.preventDefault()
        postQ4Answer({workWayTime})
            .catch(() => setTimeError("time must be written in 'xx:xx' format")
            )}
    return(
        <div>
            <h1> Questions:</h1>
            <p>1. How long do you want to sleep on your work days ?</p>

            <form  onSubmit={question1Input}>
                <input type="text" value={sleepLength} onChange={event => setSleepLength(event.target.value)} placeholder="sleep length in xx:xx format"/>
                <input type="submit" value="enter"/>
                {timeError && <div>{timeError}</div>}
            </form>

            <p>2. When does your need work start ?</p>

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
            </form>

{/*

            <p>5. do you want to change your sleep habits on weekends ?</p>
            <p>6. which are your workdays
*/}

            <br/>

            <NavLink to={"/timetable"}><button>create</button></NavLink>
        </div>
    )
}