import { Injectable } from "@nestjs/common";
import { ClienteRepository } from "../repository/clientes.repository";
import { GetListagemClientesReponse } from "../models/getListagemClientes.model";

@Injectable()
export class GetListagemClientesService {
    constructor(
        private clientesRepository: ClienteRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: number):Promise<GetListagemClientesReponse[]> {

        const retorno: Array<GetListagemClientesReponse> = []

        let idUsuario = 0
        if (propertieName && propertieValue) {
            if ((propertieName == 'id') && (propertieValue > 0))
                idUsuario = propertieValue
        }
        
        const clientes = await this.clientesRepository.listarClientes(idUsuario);        
        
        const listagemClientes = new GetListagemClientesReponse()
        
        listagemClientes.Registros = clientes
        
        retorno.push(listagemClientes)
        
        return retorno
    }
}