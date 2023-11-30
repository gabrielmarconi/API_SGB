import { IArquivo } from "src/shared/IArquivo"

export interface IEnderecoEmail {
    address: string
    name: string
}

export interface ITransporterEmail {
    from: IEnderecoEmail
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    },
    connectionTimeout: number
}

export interface IMensagemEmail {
    para: IEnderecoEmail | Array<IEnderecoEmail>,
    paraCC?: Array<IEnderecoEmail>,
    paraCCO?: Array<IEnderecoEmail>,
    assunto: string
    texto?: string
    html?: string
    anexos?: Array<IArquivo>
}

export enum TipoEmailTeste {
    Empresa = 0,
    Usuario = 1
}

export interface IEmailProvider {
    enviarEmail(email: IMensagemEmail, dataTransporter: ITransporterEmail): Promise<void>
}