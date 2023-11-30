import { Injectable } from "@nestjs/common";
import { FuncionarioRepository } from "../repository/funcionarios.repository";
import { GetListagemFuncionariosReponse } from "../models/getListagemFuncionarios.model";

@Injectable()
export class GetListagemFuncionariosService {
    constructor(
        private funcionariosRepository: FuncionarioRepository
    ) {}

    async execute():Promise<GetListagemFuncionariosReponse[]> {

        const retorno: Array<GetListagemFuncionariosReponse> = []
        
        const funcionarios = await this.funcionariosRepository.listarFuncionarios();        
        
        const listagemFuncionarios = new GetListagemFuncionariosReponse()
        
        listagemFuncionarios.Registros = funcionarios
        
        retorno.push(listagemFuncionarios)
        
        return retorno
    }
}