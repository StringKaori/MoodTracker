import DefaultMoodType from "./DefaultMoodType"

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

export interface PastMoodType {
    id: number,
    quantity: number
}

export interface PastSixMonthsMoodType {
    stack: PastMoodType[],
    label: string
}

export interface UpdateImageType {
    profile_img : string
}

export interface UserDataType {
    username : string,
    streakKind :  string,
    email: string,
    password: string,
    profileImage: string,
    recentMoods : DefaultMoodType[]
}

export interface UserChangeType {
    username?: string,
    email?: string,
    password?: string,
}
