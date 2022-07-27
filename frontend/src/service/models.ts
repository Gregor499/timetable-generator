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
    id?: string
    time: string
    length: number
    end: string
    timeInMinutes? : number
}

export interface Question {
    id: string
    questionId: string
    question: string
    type: string
}

export interface TimeAnswer {
    id?: string
    questionId: string

    time: string
}

export interface WeekdayAnswer {
    id?: string
    questionsId: string
    answer: string

    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
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

