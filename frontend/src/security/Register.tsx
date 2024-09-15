import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../service/apiService";
import "./LoginAndRegister.css"
import { error } from "console";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const register = (ev: FormEvent) => {
        ev.preventDefault();
        registerUser({ username, password, passwordRepeat })
        .then(() => {
            return loginUser({ username, password });
        })
        .then((loginResponse) => localStorage.setItem("jwt", loginResponse.jwt))
        .then(() => nav("/"))
        .catch(() => setErrorMessage("User could not be created. User already exists ?"));
    };

    return (
        <body>
        <header>
            <h3 className="heading">Registration</h3>
        </header>
        <section>
            <article>
                <form onSubmit={register}>
                    <input
                        className="inputField"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="username"
                    />
                    <input
                        className="inputField"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="password"
                    />
                    <input
                        className="inputField"
                        type="password"
                        value={passwordRepeat}
                        onChange={(event) => setPasswordRepeat(event.target.value)}
                        placeholder="repeat password"
                    />
                    <input
                        className="submitButton"
                        type="submit"
                        value="Register"
                    />
                    {errorMessage && <div>{errorMessage}</div>}
                </form>
            </article>
        </section>
        </body>
    );
}