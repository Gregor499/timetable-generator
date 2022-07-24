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

/*
export interface TimeUnitList{
    timeunit: TimeUnit
}*/
