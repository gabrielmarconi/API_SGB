import { Injectable } from "@nestjs/common";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { VerificaAtendimentoExistenteDTO } from "../dto/verificaAtendimentoExistente.dto";
import { VerificaAtendimentoExistenteResponse } from "../models/verificaAtendimentoExistente.model";

@Injectable()
export class VerificaAtendimentoExistenteService {
    constructor(
        private atendimentoRepository: AtendimentoRepository
    ) {}

    async execute(data: VerificaAtendimentoExistenteDTO):Promise<VerificaAtendimentoExistenteResponse[]> {

        const retorno: Array<VerificaAtendimentoExistenteResponse> = []

        const parametrosVerificacao = {
            dataInicio: data.dataInicio + ':00',
            dataTermino: data.dataTermino + ':00',
            idFuncionario: data.idFuncionario,
            todosAtendimentos: data.idAtendimento ? 0 : 1,
            idAtendimento: data.idAtendimento ? data.idAtendimento : 0
        }        
        
        const atendimentosExistentes = await this.atendimentoRepository.verificarAtendimentoExistente(parametrosVerificacao); 
        
        const verificacao = new VerificaAtendimentoExistenteResponse()
        
        if (atendimentosExistentes.length > 0)
            verificacao.MensagemErro = 'Existe pelo menos um atendimento no período informado para o mesmo funcionário!'
        else 
            verificacao.MensagemErro = ''
        
        retorno.push(verificacao)
        
        return retorno
    }
}