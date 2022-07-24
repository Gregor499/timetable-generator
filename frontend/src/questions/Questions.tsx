import {NavLink} from "react-router-dom";

export default function Questions() {
    return(
        <div>
            <h1> Questions:</h1>
            <p>1. How long do you want to sleep on your work days ?</p>
            <p>2. When do you need to be at work ?</p>
            <p>3. How long does it take you to get ready ?
                <ul>
                    Estimate time for:
                    <li>personal hygiene(taking a shower, brushing your teeth, using deodorant)</li>
                        <li>daydreaming</li>
                        <li>breakfast, preparation for breakfast</li>
                        <li>washing your dishes, getting dressed</li>
                        <li>meditation, reading)</li>
                </ul>
            </p>
            <p>4. How long does it take you to get to work ?</p>
            <p>5. do you want to change your sleep habits on weekends ?</p>
            <NavLink to={"/timetable"}><button>create</button></NavLink>
        </div>
    )
}