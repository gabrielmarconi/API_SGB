import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { AtendimentoServicoRepository } from "../repository/atendimentosServicos.repository";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { ServicoRepository } from "src/modules/servicos/repository/servicos.repository";
import { CreateAtendimentosServicosDTO } from "../dto/createAtendimentosServicos.dto";
import { AtendimentoServicoEntity } from "../entities/atendimentosServicos.entity";
import { ATENDIMENTOS_CONSTANTS } from "../constants/atendimentos.constants";
import { SERVICOS_CONSTANTS } from "src/modules/servicos/constants/servicos.constants";

@Injectable()
export class CreateAtendimentoServicoService {
    constructor(
        private atendimentoServicoRepository: AtendimentoServicoRepository,
        private atendimentoRepository: AtendimentoRepository,
        private servicoRepository: ServicoRepository    
    ) {}

    async execute(data: CreateAtendimentosServicosDTO): Promise<AtendimentoServicoEntity> {
        const atendimentoServico = new AtendimentoServicoEntity(data)        

        // verifica se o atendimento existe                
        const atendimento = await this.atendimentoRepository.get().find({
            where: { 'id': data.idAtendimento }
        })
        if (!atendimento) 
            throwNotFoundError(ATENDIMENTOS_CONSTANTS.ATENDIMENTO_NAO_ENCONTRADO)

        // verifica se o servico existe
        const servico = await this.servicoRepository.get().find({
            where: { 'id': data.idServico }
        })
        if (!servico)
            throwNotFoundError(SERVICOS_CONSTANTS.SERVICO_NAO_ENCONTRADO)

        return await this.atendimentoServicoRepository.save(atendimentoServico)
    }
}