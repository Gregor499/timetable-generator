import {NavLink} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {loginUser} from "./service/apiService";
import {LoginResponse} from "./service/models";

export default function Startpage() {

    const [username, setUsername] = useState("du bist nicht eingeloggt")
    const [errorMessage, setErrorMessage] = useState("")

    let token = localStorage.getItem("jwt")

    useEffect(() => {
        axios.get("/api/users", {headers: {
            Authorization: `Bearer ${token}`,
            }})
            .then((response: AxiosResponse<String>) => response.data).then((value) => {
            setUsername(value.toString())
        })
            .catch(()=> setErrorMessage("username not found"))

    })

    return (
        <div>
            <h3>Hallo, {username}</h3>
            {errorMessage && <div>{errorMessage}</div>}

            <NavLink to={"/timetable"}><button>create</button></NavLink>

            <NavLink to={"/register"}><button>register</button></NavLink>

            <NavLink to={"/login"}><button>login</button></NavLink>

        </div>
);
}