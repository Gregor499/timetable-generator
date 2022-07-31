import {
    LoginData,
    LoginResponse, PreparationTimeMorning, Question, SleepLength, TimeAnswer,
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

export const postTimeUnitCreationData = (timeUnit: TimeUnit) => {
    return axios.post("api/time", timeUnit, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<TimeUnit[]>) => response.data)
}

/*export const postQuestionList = () => {
    return axios.post("api/questions",[
        {
            "id": "1",
            "questionId": "1",
            "question": "sabusa?"
        },
        {
            "id": "2",
            "questionId": "2",
            "question": "sabusava?"
        }
    ], {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<Question[]>) => response.data)
}*/

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
}

export const getQ1Data = (Q1ProcessedAnswer: Boolean) => {
    return axios.get("api/answers1", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}