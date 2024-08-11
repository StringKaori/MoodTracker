// interfaces para definir os types necessários para objetos mood
export default interface DefaultMoodType {
    mood_id?: string, // uuid do registro
    id: number, // id do enum pra mostrar o emoji
    date?: Date, // data do registro do mood
    note?: string // nota atrelada ao mood
}

export interface NavigationMoodType {
    mood_id?: string, // uuid do registro
    id: number, // id do enum pra mostrar o emoji
    dateString: string, // data do registro do mood convertida para string
    note?: string // nota atrelada ao mood
}
