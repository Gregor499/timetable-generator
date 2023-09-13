export interface UserCreationData {
    username: string
    password: string
    passwordRepeat: string
}

export interface LoginData {
    username: string
    password: string
}

export interface LoginResponse {
    jwt: string
}

export interface TimeUnit {
    id?: string
    time: string
    length: number
    end: string
    timeInMinutes?: number
}

export interface Question {
    id: string
    order: number
    question: string
    type: string
    previousQuestionId: string
}

export interface TimeAnswer {
    id?: string
    questionId: string
    question: string

    time?: string
    timeInMinutes: number
}

export interface WorkdayAnswer {
    id?: string
    questionId: string
    question: string

    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
}

export interface ProcessedTimeAnswer {
    id: string
    task: string
    workday: boolean
    color: string
    timeList: string[]
}

