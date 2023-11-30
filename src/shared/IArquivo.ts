export interface IArquivo {
    CodigoAnexo?: string
    Campo?: string | null
    filename: string
    encoding: string
    content: string
    type?: string
    cid?: string
}