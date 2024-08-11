// função utilizada para criar e formatar a string de data
// utilizada nos cards de mood

export function convertToDateString(date: string | Date): string {

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    function getOrdinalSuffix(day: number): string {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

    return `${dayOfWeek}., ${month} ${dayWithSuffix}`;
}
