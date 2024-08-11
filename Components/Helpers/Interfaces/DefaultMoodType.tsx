export default interface DefaultMoodType {
    // uuid: number, // uuid do registro
    id: number, // id do enum pra mostrar o emoji
    date?: Date, // data do registro do mood
    note?: string // nota atrelada ao mood
}

export interface NavigationMoodType {
    id: number,
    dateString: string,
    note?: string
}
