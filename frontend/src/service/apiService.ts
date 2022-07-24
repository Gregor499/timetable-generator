import {LoginData, LoginResponse, TimeUnit, UserCreationData} from "./models";
import axios, {AxiosResponse} from "axios";
import TimeUnits from "../timetable/TimeUnits";

export const registerUser = (userCreationData: UserCreationData) =>{
    return axios.post("api/users", userCreationData)
}

export const loginUser = (loginData: LoginData) =>{
    return axios.post("api/auth/login", loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}

export const postTimeUnitCreationData = () => {
    return axios.post("api/time", {
        "time": "08:00",
        "length": "5",
        "end": "22:00"
    })
        .then((response: AxiosResponse<TimeUnit[]>) => response.data)
}