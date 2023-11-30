import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { ATENDIMENTOS_CONSTANTS } from "../constants/atendimentos.constants";
import { AtendimentoRepository } from "../repository/atendimentos.repository";

@Injectable()
export class DeleteAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository
    ) {}

    async execute(id: number) {
        const atendimentoExclusao = await this.atendimentoRepository.get().find({
            where: { 'id': id }
        })
        if (!atendimentoExclusao)
            throwNotFoundError(ATENDIMENTOS_CONSTANTS.ATENDIMENTO_NAO_ENCONTRADO)
        return await this.atendimentoRepository.delete('id', atendimentoExclusao[0])
    }
}