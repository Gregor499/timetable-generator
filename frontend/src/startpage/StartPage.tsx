import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {postTimeUnitCreationData} from "../service/apiService";
import "./StartPage.css"

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)
    let token = localStorage.getItem("jwt")

    useEffect(() => {
        axios.get("/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response: AxiosResponse<String>) => response.data)
            .then((value) => {
                setUsername(value.toString())
                localStorage.setItem("userName", value.toString())
            })
            .catch(() => setErrorMessage(""))

        if (token == null) {
            setLoginStatus(false)
            setUsername("you are not logged in ")
        }
    }, [token])

    const loginOut = () => {
        setLoginStatus(false)
        localStorage.removeItem("jwt");
    }

    useEffect(() => {
        postTimeUnitCreationData({
            "time": "00:00",
            "length": 15,
            "end": "24:00"
        })
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    return (
        <div className="body">
            <div className="content">
                <h3 className="timetableGenerator">Timetable Generator</h3>
                <h3 className="greeting">Hello{", " + username + " !"}</h3>

                {errorMessage && <div>{errorMessage}</div>}
                <div className="row">
                    <NavLink className="selectionBox" to={"/questions"}>
                        <button className="navButton">Lets´s create !</button>
                    </NavLink>

                    <NavLink className="selectionBox" to={"/register"}>
                        <button className="navButton">register</button>
                    </NavLink>

                    {!loginStatus && <NavLink className="selectionBox" to={"/login"}>
                        <button className="navButton">login</button>
                    </NavLink>}

                    {loginStatus && <div className="selectionBox">
                        <form onSubmit={loginOut}>
                            <input className="navButton" type="submit" value="logout"/>
                        </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}