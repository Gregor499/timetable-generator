import Startpage from "./Startpage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Timetable from "./Timetable";
import Register from "./security/Register";
import Login from "./security/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Startpage/>}/>
                <Route path={"/timetable"} element={<Timetable/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </BrowserRouter>

    );
}