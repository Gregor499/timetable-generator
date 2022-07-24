import {NavLink} from "react-router-dom";

export default function Questions() {
    return(
        <div>
            questions
            <NavLink to={"/timetable"}><button>create</button></NavLink>
        </div>
    )
}