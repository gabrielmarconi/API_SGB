import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { throwBadRequest, throwNotFoundError } from "src/common/errors";
import { IParametersRequest } from "src/core/interfaces/IParametersRequest.interface";
import { ANEXOS_CONSTANTS } from "../constants/anexos.constants";
import { DeleteAnexoDTO } from "../dto/deleteAnexo.dto";
import { AnexoEntity } from "../entities/anexos.entity";
import { AnexosRepository } from "../repository/anexos.repository";

@Injectable()
export class DeleteAnexoService {
    constructor(
        private readonly configService: ConfigService,
        private anexosRepository: AnexosRepository
    ) {}

    async execute(data: DeleteAnexoDTO, parameters: IParametersRequest) {
        // diretorio padrao de anexos
        const diretorioAnexos = String(this.configService.get('FILES_BASE_DIRECTORY'))

        // verifica se a entidade informada existe
        const entidadeExistente = await this.anexosRepository.verificarEntidade(data.Entidade)
        if (!entidadeExistente)
            throwNotFoundError(ANEXOS_CONSTANTS.ANEXOS_ENTIDADE_NAO_ENCONTRADA)

        let arquivoExistente: AnexoEntity | undefined = undefined
        let arquivos: Array<AnexoEntity> = []

        if (data.CodigoAnexo) {
            // verifica se o arquivo informado existe
            arquivoExistente = await this.anexosRepository.get().findOne({
                where: {
                    'Entidade': data.Entidade,
                    'Chave': data.Chave,
                    'CodigoAnexo': data.CodigoAnexo                    
                }
            })
            if (!arquivoExistente)
                throw { message: 'O arquivo informado não foi localizado.' }
            arquivos.push(arquivoExistente)
        } else {
            arquivos = await this.anexosRepository.get().find({
                where: {
                    'Entidade': data.Entidade,
                    'Chave': data.Chave
                }
            })
        }

        let retorno: Array<boolean> = []
        for (let arquivo of arquivos) {
            try {
                // exclui o arquivo do diretorio
                fs.unlinkSync(path.join(diretorioAnexos, arquivo.Entidade, String(arquivo.Chave), arquivo.NomeArquivo))
                // verifica se o diretorio esta vazio se estiver remove o mesmo
                const diretorioVazio = fs.readdirSync(path.join(diretorioAnexos, arquivo.Entidade, String(arquivo.Chave))).length > 0 ? false : true
                if (diretorioVazio)
                    fs.rmdirSync(path.join(diretorioAnexos, arquivo.Entidade, String(arquivo.Chave)))
            } catch (err) {
                throwBadRequest(err)
            }

            const result = await this.anexosRepository.delete('chave', arquivo)
            retorno.push(result)
        }
        return retorno.find((item) => item === false) || retorno.length <= 0 ? false : true
    }
}