import Startpage from "./Startpage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Timetable from "./Timetable";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Startpage/>}/>
                <Route path={"/timetable"} element={<Timetable/>}/>
            </Routes>
        </BrowserRouter>

    );
}