export interface LoginBodyType {
    email: string,
    password: string
}

export interface RegisterBodyType {
    username: string,
    email: string,
    password: string
}

export interface NewMoodType {
    id: number,
    note: string
}
