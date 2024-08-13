import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/apiService";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const login = (ev: FormEvent) => {
        ev.preventDefault();
        loginUser({ username, password })
            .then((loginResponse) => localStorage.setItem("jwt", loginResponse.jwt))
            .then(() => nav("/"))
            .catch(() => setErrorMessage("Login failed"));
    };

    return (
        <div className="page mx-auto bg-yellow-300/45 flex flex-col justify-stretch font-roboto-light pt-20 pb-[22%] w-full">
            <h3 className="heading text-5xl underline ml-auto w-[61%]">Login</h3>
            <form onSubmit={login}>
                <input
                    className="inputField text-2xl"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="username"
                />
                <input
                    className="inputField text-2xl"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="password"
                />
                <input
                    className="submitButton text-2xl mx-auto"
                    type="submit"
                    value="Login"
                />
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    );
}