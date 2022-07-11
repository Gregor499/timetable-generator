import {useNavigate} from "react-router-dom";

export default function Startpage() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/timetable")}>create</button>
        </div>
    );
}