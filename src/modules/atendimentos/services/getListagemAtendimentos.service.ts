import { Injectable } from "@nestjs/common";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { GetListagemAtendimentosResponse } from "../models/getListagemAtendimentos.model";

@Injectable()
export class GetListagemAtendimentosService {
    constructor(
        private atendimentosRepository: AtendimentoRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: number):Promise<GetListagemAtendimentosResponse[]> {

        const retorno: Array<GetListagemAtendimentosResponse> = []

        let idCliente = 0
        if (propertieName && propertieValue) {
            if ((propertieName == 'id') && (propertieValue > 0))
                idCliente = propertieValue            
        }        
        
        const atendimentos = await this.atendimentosRepository.listarAtendimentos(idCliente);        
        
        const listagemAtendimentos = new GetListagemAtendimentosResponse()
        
        listagemAtendimentos.Registros = atendimentos
        
        retorno.push(listagemAtendimentos)
        
        return retorno
    }
}