import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { IParametersRequest } from "src/core/interfaces/IParametersRequest.interface";
import { UpdateAnexoDTO } from "../dto/updateAnexo.dto";
import { AnexoEntity } from "../entities/anexos.entity";
import { AnexosRepository } from "../repository/anexos.repository";

@Injectable()
export class UpdateAnexoService {
    constructor(
        private readonly configService: ConfigService,
        private anexosRepository: AnexosRepository
    ) {}

    async execute(data: UpdateAnexoDTO, parameters: IParametersRequest) {
        // busca os anexos com a chave temporaria
        const anexos: Array<AnexoEntity> = await this.anexosRepository.get().find({
            where: {
                'Chave': data.ChaveTemporaria,
                'Entidade': data.Entidade
            }
        })

        // percorre todos os anexos atualizando a chave
        for (let anexo of anexos) {
            anexo.Chave = data.Chave as string
            await this.anexosRepository.update('chave', anexo)
        }

        // captura o diretorio padrao para anexos
        const diretorioAnexos = String(this.configService.get('FILES_BASE_DIRECTORY'))

        let caminhoTemporario = path.join(diretorioAnexos, data.Entidade, String(data.ChaveTemporaria))
        let caminhoAtualizado = path.join(diretorioAnexos, data.Entidade, String(data.Chave))

        // atualiza o nome da pasta com a nova chave
        if (fs.existsSync(caminhoTemporario))
            fs.renameSync(caminhoTemporario, caminhoAtualizado)

        return true
    }
}