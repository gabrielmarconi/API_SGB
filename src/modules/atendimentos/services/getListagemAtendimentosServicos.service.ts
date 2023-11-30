import { Injectable } from "@nestjs/common";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { GetListagemAtendimentosServicosResponse } from "../models/getListagemAtendimentosServicos.model";

@Injectable()
export class GetListagemAtendimentosServicosService {
    constructor(
        private atendimentosRepository: AtendimentoRepository
    ) {}

    async execute(id: number):Promise<GetListagemAtendimentosServicosResponse[]> {

        const retorno: Array<GetListagemAtendimentosServicosResponse> = []
        
        const atendimentosServicos = await this.atendimentosRepository.listarAtendimentosServicos(id);        
        
        const listagemAtendimentosServicos = new GetListagemAtendimentosServicosResponse()
        
        listagemAtendimentosServicos.Registros = atendimentosServicos
        
        retorno.push(listagemAtendimentosServicos)
        
        return retorno
    }
}