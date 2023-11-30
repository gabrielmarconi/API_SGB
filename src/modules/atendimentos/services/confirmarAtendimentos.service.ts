import { Injectable } from "@nestjs/common";
import { throwBadRequest } from "src/common/errors/badRequest.error";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { ConfirmarAtendimentoDTO } from "../dto/confirmarAtendimentos.dto";
import { ATENDIMENTOS_CONSTANTS } from "../constants/atendimentos.constants";

@Injectable()
export class ConfirmarAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository
    ) {}

    async execute(id: number, data: ConfirmarAtendimentoDTO) {
        
        // busca o atendimento através do id
        const buscaAtendimento = await this.atendimentoRepository.get().findOne({
            where: {'id': id}
        })
        if (!buscaAtendimento)
            throwBadRequest(ATENDIMENTOS_CONSTANTS.ATENDIMENTO_NAO_ENCONTRADO)

        const atendimentoSelecionado = buscaAtendimento
        
        let retorno
        // Atualiza o atendimento se confirmado ou deleta se não confirmado
        if (data.confirmado == 'N') {
            await this.atendimentoRepository.delete('id', atendimentoSelecionado)
            retorno = 0
        } else {
            atendimentoSelecionado.confirmado = 'S'
            retorno = await this.atendimentoRepository.update('id', atendimentoSelecionado)
        }

        return retorno                    
        
    }
}