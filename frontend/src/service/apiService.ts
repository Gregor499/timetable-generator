import {
    LoginData,
    LoginResponse, PreparationTimeMorning, SleepTime,
    TimeUnit,
    UserCreationData,
    WorkStartTime,
    WorkWayTime
} from "./models";
import axios, {AxiosResponse} from "axios";

export const registerUser = (userCreationData: UserCreationData) => {
    return axios.post("api/users", userCreationData)
}

export const loginUser = (loginData: LoginData) => {
    return axios.post("api/auth/login", loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}

export const postTimeUnitCreationData = () => {
    return axios.post("api/time", {
        "time": "08:00",
        "length": "5",
        "end": "22:00"
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeUnit[]>) => response.data)
}

export const postQ1Answer = (sleepTime: SleepTime) => {
    return axios.post("api/anwers", sleepTime, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

export const postQ2Answer = (workStartTime: WorkStartTime) => {
    return axios.post("api/anwers", workStartTime, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

export const postQ3Answer = (preparationTimeMorning: PreparationTimeMorning) => {
    return axios.post("api/anwers", preparationTimeMorning, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

export const postQ4Answer = (workWayTime: WorkWayTime) => {
    return axios.post("api/anwers", workWayTime, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

export const getQ1Data = (Q1ProcessedAnswer: Boolean) => {
    return axios.get("api/anwers", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}