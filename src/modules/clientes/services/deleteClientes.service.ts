import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { CLIENTES_CONSTANTS } from "../constants/clientes.constants";
import { ClienteRepository } from "../repository/clientes.repository";
import { UsuarioRepository } from "src/modules/usuarios/repository/usuarios.repository";
import { USUARIO_CONSTANTS } from "src/modules/usuarios/constants/usuarios.constants";

@Injectable()
export class DeleteClienteService {
    constructor(
        private clienteRepository: ClienteRepository,
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number) {
        let idUsuario
        
        const cliente = await this.clienteRepository.get().findOne({
            where: { 'id': id }
        })
        if (!cliente)
            throwNotFoundError(CLIENTES_CONSTANTS.CLIENTE_NAO_ENCONTRADO)
        else {
            idUsuario = cliente.idUsuario
        }

        const clienteExcluido = await this.clienteRepository.delete('id', cliente)
        
        if (clienteExcluido) {
            const usuario = await this.usuarioRepository.get().findOne({
                where: { 'id': idUsuario }
            })
            if (!usuario) 
                throwNotFoundError(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)
            else {
                await this.usuarioRepository.delete('id', usuario)
            }
        }
        
        return clienteExcluido
    }
}