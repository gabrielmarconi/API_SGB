import { Injectable } from "@nestjs/common";
import { throwBadRequest } from "src/common/errors/badRequest.error";
import { ServicoRepository } from "../repository/servicos.repository";
import { AtualizarValorServicoDTO } from "../dto/atualizarValoresServicos.dto";
import { SERVICOS_CONSTANTS } from "../constants/servicos.constants";

@Injectable()
export class AtualizarValorServicoService {
    constructor(
        private servicoRepository: ServicoRepository
    ) {}

    async execute(data: AtualizarValorServicoDTO) {        

        for (let servico of data.servicos) {
            let valorDesconto = 0
            let valorAcrescimo = 0
            
            // busca o servico através do id
            const buscaServico = await this.servicoRepository.get().findOne({
                where: {'id': servico}
            })
            if (!buscaServico)
                throwBadRequest(SERVICOS_CONSTANTS.SERVICO_NAO_ENCONTRADO)                                    
                        
            if (data.tipoAtualizacao == 'D') {                
                valorDesconto = (buscaServico.valor * data.percentual) / 100                
                buscaServico.valor = (buscaServico.valor - valorDesconto)
                await this.servicoRepository.update('id', buscaServico)                                            
            } else {
                valorAcrescimo = (buscaServico.valor * data.percentual) / 100
                buscaServico.valor = (buscaServico.valor + valorAcrescimo)
                await this.servicoRepository.update('id', buscaServico)                            
            }                                            
        }
        return true
        
    }
}