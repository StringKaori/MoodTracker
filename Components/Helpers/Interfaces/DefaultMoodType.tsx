export default interface DefaultMoodType {
    mood_id?: string, // uuid do registro
    id: number, // id do enum pra mostrar o emoji
    date?: Date, // data do registro do mood
    note?: string // nota atrelada ao mood
}

export interface NavigationMoodType {
    mood_id?: string,
    id: number,
    dateString: string,
    note?: string
}
