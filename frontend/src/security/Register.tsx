import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/apiService";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const register = (ev: FormEvent) => {
        ev.preventDefault();
        registerUser({ username, password, passwordRepeat })
            .then(() => nav("/"))
            .catch(() => setErrorMessage("User could not be created."));
    };

    return (
        <div className="page mx-auto bg-yellow-300/45 flex flex-col justify-stretch font-roboto-light pt-20 pb-[22%] w-full">
            <h3 className="heading text-5xl underline ml-auto w-[61%]">Registration</h3>
            <form onSubmit={register}>
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
                    className="inputField text-2xl"
                    type="password"
                    value={passwordRepeat}
                    onChange={(event) => setPasswordRepeat(event.target.value)}
                    placeholder="repeat password"
                />
                <input
                    className="submitButton text-2xl mx-auto"
                    type="submit"
                    value="Register"
                />
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    );
}