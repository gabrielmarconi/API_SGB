import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { UsuarioRepository } from "../repository/usuarios.repository";
import { AlterarSenhaDTO } from "../dto/alterarSenha.dto";
import { throwBadRequest } from "src/common/errors/badRequest.error";
import { USUARIO_CONSTANTS } from "../constants/usuarios.constants";
import dataAjustada from "src/shared/rotinas";

@Injectable()
export class AlterarSenhaService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(id: number, data: AlterarSenhaDTO) {

        // busca o usuario através do email
        const buscaUsuario = await this.usuarioRepository.get().find({
            where: {'email': data.email}
        })
        if (buscaUsuario.length <= 0)
            throwBadRequest(USUARIO_CONSTANTS.USUARIO_NAO_ENCONTRADO)

        const usuario = buscaUsuario[0]

        // verifica se a senha atual esta correta
        if (!await argon2.verify(usuario.senha, data.senhaAtual))
            throwBadRequest(USUARIO_CONSTANTS.SENHA_INVALIDA)

        // verifica se as nova senha e a confirmacao coicidem
        if (data.novaSenha !== data.confirmarSenha)
            throwBadRequest(USUARIO_CONSTANTS.SENHA_NAO_COINCIDEM)

        usuario.senha = await argon2.hash(data.novaSenha)
        usuario.dataAlteracaoSenha = dataAjustada()
        usuario.senhaProvisoria = 'N'

        return await this.usuarioRepository.update('id', usuario)
    }
}