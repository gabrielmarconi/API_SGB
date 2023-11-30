import { Injectable } from "@nestjs/common";
import { throwBadRequest } from "src/common/errors/badRequest.error";
import { ClienteRepository } from "src/modules/clientes/repository/clientes.repository";
import { FuncionarioRepository } from "src/modules/funcionarios/repository/funcionarios.repository";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";

@Injectable()
export class GetTipoUsuarioService {
    constructor(
        private usuarioRepository: UsuarioRepository,
        private clienteRepository: ClienteRepository,
        private funcionarioRepository: FuncionarioRepository        
    ) {}

    async execute(id: number) {
        let tipoUsuario
                
        // busca o usuario através do id
        const buscaUsuario = await this.usuarioRepository.get().findOne({
            where: {'id': id}
        })                              
        if (buscaUsuario) {
            if (buscaUsuario.administrador == 'S')
                tipoUsuario = 'M'
            else {                       
                // busca o cliente através do id
                const buscaCliente = await this.clienteRepository.get().findOne({
                    where: {'idUsuario': buscaUsuario.id}
                })            
                if (buscaCliente)
                    tipoUsuario = 'C'
                
                // busca o funcionario através do id
                const buscaFuncionario = await this.funcionarioRepository.get().findOne({
                    where: {'idUsuario': buscaUsuario.id}
                })
                if (buscaFuncionario)
                    tipoUsuario = 'F'                
            }
        }                                  

        return tipoUsuario         
        
    }
}