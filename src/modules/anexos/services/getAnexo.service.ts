import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as mimeType from "mime-types";
import * as path from "path";
import { throwBadRequest } from "src/common/errors";
import { IParametersRequest } from "src/core/interfaces/IParametersRequest.interface";
import { GetAnexoDTO } from "../dto/getAnexo.dto";
import { Arquivo } from "../models/arquivo.model";
import { GetAnexoReponse } from "../models/getAnexosResponse.model";
import { AnexosRepository } from "../repository/anexos.repository";

@Injectable()
export class GetAnexoService {
    constructor(
        private readonly configService: ConfigService,
        private anexosRepository: AnexosRepository
    ) {}

    async execute(data: GetAnexoDTO, parameters: IParametersRequest) {
        // verifica se a entidade informada existe
        const entidadeExistente = await this.anexosRepository.verificarEntidade(data.Entidade)
        if (!entidadeExistente)
            throw { message: 'A entidade informada não existe.' }

        // monta o retorno da requisição
        const retorno = new GetAnexoReponse()
        retorno.Entidade = data.Entidade
        retorno.Chave = data.Chave
        retorno.Arquivos = []

        // busca os dados de anexos
        const anexos = await this.anexosRepository.get().find({
            where: {
                'Entidade': data.Entidade,
                'Chave': data.Chave,
                'Campo': data.Campo ?? null
            }
        })

        // captura o diretorio anexo padrao
        const diretorioAnexos = String(this.configService.get('FILES_BASE_DIRECTORY'))

        try {
            for (let file of anexos) {

                // efetua a leitura do arquivo
                const arquivo = fs.readFileSync(path.join(diretorioAnexos, data.Entidade, String(data.Chave), file.NomeArquivo))

                let anexo = new Arquivo()
                anexo.CodigoAnexo = file.CodigoAnexo
                anexo.filename = file.NomeArquivo
                anexo.type = mimeType.lookup(file.NomeArquivo) as string
                anexo.encoding = 'base64'
                anexo.content = arquivo.toString('base64')

                retorno.Arquivos.push(anexo)
            }
        } catch (err) {
            throwBadRequest(err)
        }

        return retorno
    }
}