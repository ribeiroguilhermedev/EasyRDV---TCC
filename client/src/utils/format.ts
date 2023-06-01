export function formatDate(date: Date | string) {
    if (typeof date === 'string') {
        date = new Date(date);
        if (isNaN(date.getTime()))
            return ''
    }

    let day = date.getDate();
    let month = date.getMonth() + 1; // O mês do JavaScript começa em 0
    let year = date.getFullYear();

    let strDay, strMonth

    strDay = day.toString()
    strMonth = month.toString()

    if (day < 10) strDay = `0${day}`;
    if (month < 10) strMonth = `0${month}`;

    return strDay + '/' + strMonth + '/' + year;
}

export function formatCurrency(value: number): string {
    const formatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formatted.replace('R$', '').trim();
}