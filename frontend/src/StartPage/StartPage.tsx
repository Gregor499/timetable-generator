import {NavLink} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)
    let token = localStorage.getItem("jwt")

    useEffect(() => {
        axios.get("/api/users", {headers: {
            Authorization: `Bearer ${token}`,
            }})
            .then((response: AxiosResponse<String>) => response.data).then((value) => {
            setUsername(value.toString())
        })
            .catch(()=> setErrorMessage(""))
        if (token== null){
            setLoginStatus(false)
            setUsername("you are not logged in !")
        }
    })

    const loginOut = () => {
        setLoginStatus(false)
        localStorage.removeItem("jwt");
    }

    return (
        <div>
            <h3>Hallo {username}</h3>
            {errorMessage && <div>{errorMessage}</div>}

            <NavLink to={"/questions"}><button>Lets´s go !</button></NavLink>

            <NavLink to={"/register"}><button>register</button></NavLink>

            {!loginStatus && <NavLink to={"/login"}><button>login</button></NavLink>}

            {loginStatus && <form onSubmit= {loginOut}>
                <input type="submit" value="logout"/>
            </form>
            }

        </div>
);
}