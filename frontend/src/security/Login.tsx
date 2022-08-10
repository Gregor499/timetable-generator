import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../service/apiService";
import "./LoginAndRegister.css"


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const nav = useNavigate()

    const login = (ev: FormEvent) => {
        ev.preventDefault()
        loginUser({username, password})
            .then(loginResponse => localStorage.setItem("jwt", loginResponse.jwt))
            .then (() => nav("/"))
            .catch(() => setErrorMessage("Login failed"))
    }

    return (
        <div className="page">
            <h3 className="heading">Login</h3>
            <form onSubmit={login}>
                <input className="inputField" type="text" value={username} onChange={event => setUsername(event.target.value)} placeholder="username"/>
                <input className="inputField" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="password"/>
                <input className="submitButton" type="submit" value="Login"/>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    )
}