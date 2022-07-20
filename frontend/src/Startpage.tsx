import {NavLink} from "react-router-dom";

export default function Startpage() {
    return (
        <div>
            <NavLink to={"/timetable"}><button>create</button></NavLink>

            <NavLink to={"/register"}><button>register</button></NavLink>

            <NavLink to={"/login"}><button>login</button></NavLink>

        </div>
);
}