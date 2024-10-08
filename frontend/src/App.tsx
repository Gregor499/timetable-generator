import {BrowserRouter, Route, Routes} from "react-router-dom";
import StartPage from "./startpage/StartPage";
import Timetable from "./timetable/Timetable";
import Register from "./security/Register";
import Login from "./security/Login";
import Questions from "./questions/Questions";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<StartPage/>}/>
                <Route path={"/timetable"} element={<Timetable/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/questions"} element={<Questions/>}/>
            </Routes>
        </BrowserRouter>

    );
}