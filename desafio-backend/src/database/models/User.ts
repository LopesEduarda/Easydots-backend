export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
}

export type InputUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date
}

export type authenticationData = {
    id: string
}