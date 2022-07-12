import {NavLink} from "react-router-dom";

export default function Startpage() {
    return (
        <NavLink to={"/timetable"}><button>create</button></NavLink>
    );
}