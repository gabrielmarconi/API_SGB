import { Injectable } from "@nestjs/common";
import { CreateServicosDTO } from "../dto/createServicos.dto";
import { ServicoEntity } from "../entities/servicos.entity";
import { ServicoRepository } from "../repository/servicos.repository";
import { throwNotFoundError } from "src/common/errors";
import { SERVICOS_CONSTANTS } from "../constants/servicos.constants";

@Injectable()
export class UpdateServicoService {
    constructor(
        private servicoRepository: ServicoRepository
    ) {}

    async execute(id: number, data: CreateServicosDTO) {
        const servicoAlteracao = await this.servicoRepository.get().findOne({
            where: {'id': id}
        })
        if (!servicoAlteracao)
            throwNotFoundError(SERVICOS_CONSTANTS.SERVICO_NAO_ENCONTRADO)
        const servico = new ServicoEntity(data)
        servico.id = servicoAlteracao.id

        return await this.servicoRepository.update('id', servico)
    }
}