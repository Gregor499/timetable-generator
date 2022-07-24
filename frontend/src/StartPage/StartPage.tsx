import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function StartPage() {

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
            .catch(()=> setErrorMessage(""))
    })

    return (
        <div>
            <h3>Hallo, {username}</h3>
            {errorMessage && <div>{errorMessage}</div>}

            <NavLink to={"/questions"}><button>Lets´s go !</button></NavLink>

            <NavLink to={"/register"}><button>register</button></NavLink>

            <NavLink to={"/login"}><button>login</button></NavLink>

        </div>
);
}