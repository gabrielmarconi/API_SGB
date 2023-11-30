import fs from 'fs';
import path from 'path';
import * as moment from "moment";

export function decodificarBase64(caminhoArquivo: string, base64: string, nome: string, extensao: string): string {
    try {
        if (caminhoArquivo.substring(caminhoArquivo.length - 1) !== '//') {
            caminhoArquivo = path.join(caminhoArquivo + '//');
        }

        if (!fs.existsSync(caminhoArquivo)) {
            throw { message: 'Diretório não localizado' };
        }

        let nomeArquivo = path.join(`${caminhoArquivo}${nome}.${extensao}`);
        fs.writeFileSync(nomeArquivo, Buffer.from(base64, 'base64'));
        return nomeArquivo;
    } catch (error) {
        throw error
    }

}

export function codificarBase64(caminhoArquivo: string): string {
    const byte = fs.readFileSync(caminhoArquivo);
    const fileBase64 = Buffer.from(byte).toString('base64');
    return fileBase64;
}

export function deletarArquivo(caminhoArquivo: string) {
    try {
        fs.unlinkSync(caminhoArquivo);
    } catch (err) {
        throw { message: 'Erro ao tentar remover arquivo temporário ' }
    }
}

export function deletarArquivos(arquivos: string[]) {
    try {
        for (const item of arquivos) {
            fs.unlinkSync(item);
        }
    } catch (err) {
        throw { message: 'Erro ao tentar remover arquivo temporário ' }
    }
}

export function criarPasta(diretorio: string) {
    try {
        if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio, { recursive: true });
        }
    } catch (err) {
        throw { message: 'Erro ao criar pasta ' }
    }
}

/**
 * 
 * @todo
 * receber encoding via parametro 
 */
export function lerArquivo(caminhoArquivo: string, encoding: BufferEncoding): string {
    try {
        if (fs.existsSync(caminhoArquivo)) {
            return fs.readFileSync(caminhoArquivo, { encoding });
        }
        throw { message: 'Arquivo não encontrado' }
    } catch (err) {
        throw { message: 'Erro ao ler arquivo' }
    }
}

export function escreverArquivo(caminhoArquivo: string, data: string) {
    return fs.writeFileSync(caminhoArquivo, data);
}

export function listarArquivos(diretorio: string): string[] {
    try {
        return fs.readdirSync(diretorio);
    } catch (err) {
        throw { message: 'Erro ao listar arquivos' }
    }
}

export function verificarCaminho(caminho: string): boolean {
    return fs.existsSync(caminho);
}

export function lerArquivoUtf8(caminhoArquivo: string): string {
    try {
        return fs.readFileSync(caminhoArquivo, { encoding: 'utf-8' });
    } catch (error) {
        throw { message: 'Erro ao ler arquivo' }
    }
}

export default function dataAjustada(horaZerada: boolean = false): Date {
    if (horaZerada)
        return new Date(moment().format('YYYY-MM-DDT00:00:00.000') + 'Z')
    else
        return new Date(moment().format('YYYY-MM-DDTHH:mm:ss.000') + 'Z')
} 
