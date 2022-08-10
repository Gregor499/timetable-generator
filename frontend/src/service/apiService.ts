import {
    LoginData,
    LoginResponse, ProcessedTimeAnswer, Question, TimeAnswer,
    TimeUnit,
    UserCreationData,
} from "./models";
import axios, {AxiosResponse} from "axios";

export const registerUser = (userCreationData: UserCreationData) => {
    return axios.post("api/users", userCreationData)
}

export const loginUser = (loginData: LoginData) => {
    return axios.post("api/auth/login", loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}

export const postTimeUnitCreationData = (timeUnit: TimeUnit) => {
    return axios.post("api/time", timeUnit, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeUnit[]>) => response.data)
}

export const getTimeUnitList = () => {
    return axios.get("api/time", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeUnit[]>) => response.data)
}

export const getQuestionList = () => {
    return axios.get("api/questions", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<Question[]>) => response.data)
}

export const postTimeAnswer = (timeAnswer: TimeAnswer) => {
    return axios.post("api/answers", timeAnswer, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeAnswer[]>) => response.data)
}

export const getTimeAnswer = () => {
    return axios.get("api/answers", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeAnswer[]>) => response.data)
}

export const getProcessedTimeAnswers = () => {
    return axios.get("api/processedTimeAnswers", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<ProcessedTimeAnswer[]>) => response.data)
}