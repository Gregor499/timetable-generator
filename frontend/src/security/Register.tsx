import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../service/apiService";

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const nav = useNavigate()

    const register = (ev: FormEvent) => {
        ev.preventDefault()
        registerUser({username, password, passwordRepeat})
            .then(() => nav("/"))
            .catch(() => setErrorMessage("User could not be created."))
    }

    return (
        <div>
            <h3>Registration</h3>
            <form onSubmit={register}>
                <input type="text" value={username} onChange={event => setUsername(event.target.value)}
                       placeholder="username"/>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)}
                        placeholder="password"/>
                <input type="password" value={passwordRepeat}
                       onChange={event => setPasswordRepeat(event.target.value)}
                        placeholder={"repeat password"}/>
                <input type="submit" value="Register"/>
                {errorMessage && <div> {errorMessage}
                </div>
                }
            </form>
        </div>
    )
}