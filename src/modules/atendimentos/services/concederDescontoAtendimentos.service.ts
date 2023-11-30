import { Injectable } from "@nestjs/common";
import { throwBadRequest } from "src/common/errors/badRequest.error";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { ConcederDescontoAtendimentoDTO } from "../dto/concederDescontoAtendimentos.dto";
import { ATENDIMENTOS_CONSTANTS } from "../constants/atendimentos.constants";

@Injectable()
export class ConcederDescontoAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository
    ) {}

    async execute(id: number, data: ConcederDescontoAtendimentoDTO) {

        // busca o atendimento através do id
        const buscaAtendimento = await this.atendimentoRepository.get().findOne({
            where: {'id': id}
        })
        if (!buscaAtendimento)
            throwBadRequest(ATENDIMENTOS_CONSTANTS.ATENDIMENTO_NAO_ENCONTRADO)

        const atendimentoSelecionado = buscaAtendimento
        
        let retorno
        // Atualiza o atendimento com o valor do desconto e aplica o mesmo
        if (data.valorDesconto > 0) {
            atendimentoSelecionado.valorDesconto = data.valorDesconto
            atendimentoSelecionado.valorTotal -= data.valorDesconto
            retorno = await this.atendimentoRepository.update('id', atendimentoSelecionado)            
        }
        
        return retorno        
        
    }
}