import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { SERVICOS_CONSTANTS } from "../constants/servicos.constants";
import { ServicoRepository } from "../repository/servicos.repository";

@Injectable()
export class DeleteServicoService {
    constructor(
        private servicoRepository: ServicoRepository
    ) {}

    async execute(id: number) {
        const servicoExclusao = await this.servicoRepository.get().find({
            where: {'id': id}
        })
        if (servicoExclusao.length <= 0)
            throwNotFoundError(SERVICOS_CONSTANTS.SERVICO_NAO_ENCONTRADO)
        return await this.servicoRepository.delete('id', servicoExclusao[0])
    }
}