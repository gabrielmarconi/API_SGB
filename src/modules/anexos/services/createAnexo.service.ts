import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as mimeType from "mime-types";
import * as path from "path";
import { throwBadRequest, throwNotFoundError } from "src/common/errors";
import { IParametersRequest } from "src/core/interfaces/IParametersRequest.interface";
import { ImageAdjustment } from "src/shared/libs";
import { ANEXOS_CONSTANTS } from "../constants/anexos.constants";
import { CreateAnexoDTO } from "../dto/createAnexo.dto";
import { AnexoEntity } from "../entities/anexos.entity";
import { AnexosRepository } from "../repository/anexos.repository";

@Injectable()
export class CreateAnexoService {
    constructor(
        private readonly configService: ConfigService,
        private anexosRepository: AnexosRepository
    ) {}

    async execute(data: CreateAnexoDTO, parameters: IParametersRequest) {

        let retorno: Array<AnexoEntity> = []

        // verifica se a entidade informada existe
        const entidadeExistente = await this.anexosRepository.verificarEntidade(data.Entidade)
        if (!entidadeExistente)
            throwNotFoundError(ANEXOS_CONSTANTS.ANEXOS_ENTIDADE_NAO_ENCONTRADA)

        const diretorioAnexos = String(this.configService.get('FILES_BASE_DIRECTORY'))

        if (!diretorioAnexos)
            throwNotFoundError(ANEXOS_CONSTANTS.ANEXOS_DIRETORIO_PADRAO_NAO_DEFINIDO)

        try {
            // verifica se o diretorio de anexos existe se nao cria o mesmo
            if (!fs.existsSync(diretorioAnexos))
                fs.mkdirSync(diretorioAnexos)

            // verifica se existe o diretorio da organização dentro do diretorio de anexos
            if (!fs.existsSync(path.join(diretorioAnexos)))
                fs.mkdirSync(path.join(diretorioAnexos))

            // verifica se existe o diretorio da entidade informada dentro o diretorio da organizacao
            if (!fs.existsSync(path.join(diretorioAnexos, data.Entidade)))
                fs.mkdirSync(path.join(diretorioAnexos, data.Entidade))

            // verifica se existe o diretorio da chave informada dentro o diretorio da entidade
            if (!fs.existsSync(path.join(diretorioAnexos, data.Entidade, String(data.Chave))))
                fs.mkdirSync(path.join(diretorioAnexos, data.Entidade, String(data.Chave)))

            // percorre o array de anexos para realizar a inserção
            for (let arquivo of data.Arquivos) {
                // cria o novo anexo
                const anexo = new AnexoEntity()
                anexo.Entidade = data.Entidade
                anexo.Chave = data.Chave
                anexo.NomeArquivo = arquivo.filename
                anexo.Campo = arquivo.Campo ?? null

                // convert o base64 em arquivo para ser salvo no diretorio
                const buf = Buffer.from(arquivo.content, 'base64')

                // redimensiona e otimiza a imagem
                let mime = mimeType.lookup(arquivo.filename) as string
                if (mime.includes('image')) {
                    const imgAdj = new ImageAdjustment()
                    let imgResize = await imgAdj.resize(buf)
                    fs.writeFileSync(path.join(diretorioAnexos, data.Entidade, String(data.Chave), arquivo.filename), imgResize)
                } else {
                    // salva o arquivo no diretorio 
                    fs.writeFileSync(path.join(diretorioAnexos, data.Entidade, String(data.Chave), arquivo.filename), buf)
                }

                // verifica se o arquivo ja foi salvo
                const anexoExistente = await this.anexosRepository.get().findOne({
                    where: {
                        Entidade: data.Entidade,
                        Chave: data.Chave,
                        NomeArquivo: arquivo.filename                        
                    }
                })
                if (!anexoExistente) {
                    // salva o anexo
                    const anexoSalvo = await this.anexosRepository.save(anexo)
                    if (anexoSalvo)
                        retorno.push(anexoSalvo)
                }
            }
            return retorno
        } catch (err) {
            throwBadRequest(err)
        }
    }
}