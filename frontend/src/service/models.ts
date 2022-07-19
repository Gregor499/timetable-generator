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