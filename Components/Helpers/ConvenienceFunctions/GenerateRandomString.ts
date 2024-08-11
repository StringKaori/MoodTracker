// funcão utilizada para gerar strings aleatórias para servirem
// de key em componentes criados de forma dinâmica com map

interface RandomStringProp {
    length: number;
}

export function generateRandomString(props: RandomStringProp): string {
    const { length } = props;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
