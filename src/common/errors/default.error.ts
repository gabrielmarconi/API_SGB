export function throwDefaultError(message?: string) {
    throw new Error(message ?? 'Ocorreu um erro inesperado.')
}