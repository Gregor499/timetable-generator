export interface UserCreationData{
    username: string
    password: string
    passwordRepeat: string
}

export interface LoginData{
    username: string
    password: string
}

export interface LoginResponse{
    jwt: string
}

export interface TimeUnit {
    id: string
    time: string
    length: number
    end: string
}

export interface Question {
    id: string
    questionId: string
    question: string
    type: string
}

export interface Answer {
    id: string
    questionsId: string
    answer: string
    colour: string
    time: string
    weekday: string

}

export interface SleepLength {
    sleepLength: string
}

export interface WorkStartTime {
    workStartTime: string
}

export interface PreparationTimeMorning {
    preparationTimeMorning: string
}

export interface WorkWayTime {
    workWayTime: string
}

