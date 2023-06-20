export const mainColor = '#041a28'

export enum statusEnum {
    AGUARDANDO_INICIO = 1,
    EM_ANDAMENTO = 2,
    AGUARDANDO_APROVACAO = 3,
    APROVADA = 4,
    APROVADA_PARCIAL = 5,
    REPROVADA = 6,
}

export function isAguardandoInicio(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.AGUARDANDO_INICIO;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.AGUARDANDO_INICIO];

    return false;

}

export function isEmAndamento(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.EM_ANDAMENTO;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.EM_ANDAMENTO];

    return false;
}

export function isAguardandoAprovacao(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.AGUARDANDO_APROVACAO;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.AGUARDANDO_APROVACAO];

    return false;
}

export function isAprovada(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.APROVADA;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.APROVADA];

    return false;
}

export function isAprovadaParcial(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.APROVADA_PARCIAL;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.APROVADA_PARCIAL];

    return false;
}

export function isReprovada(status: string | number): boolean {
    if (typeof status === "number")
        return status === statusEnum.REPROVADA;

    if (typeof status === "string")
        return status === statusEnum[statusEnum.REPROVADA];

    return false;
}
