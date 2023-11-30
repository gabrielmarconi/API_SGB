import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { AtendimentoServicoRepository } from "../repository/atendimentosServicos.repository";
import { ATENDIMENTOSSERVICOS_CONSTANTS } from "../constants/atendimentosServicos.constants";

@Injectable()
export class DeleteAtendimentoServicoService {
    constructor(
        private atendimentoServicoRepository: AtendimentoServicoRepository
    ) {}

    async execute(id: number) {
        const atendimentoServicoExclusao = await this.atendimentoServicoRepository.get().find({
            where: { 'id': id }
        })
        if (!atendimentoServicoExclusao)
            throwNotFoundError(ATENDIMENTOSSERVICOS_CONSTANTS.ATENDIMENTOSERVICO_NAO_ENCONTRADO)
        return await this.atendimentoServicoRepository.delete('id', atendimentoServicoExclusao[0])
    }
}