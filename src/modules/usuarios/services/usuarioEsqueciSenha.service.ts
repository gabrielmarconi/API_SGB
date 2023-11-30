import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../repository/usuarios.repository";
import { UsuarioEsqueciSenhaResponse } from "../models/usuarioEsqueciSenha.model";
import { UsuarioEsqueciSenhaDTO } from "../dto/usuarioEsqueciSenha.dto";

@Injectable()
export class UsuarioEsqueciSenhaService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(data: UsuarioEsqueciSenhaDTO):Promise<UsuarioEsqueciSenhaResponse[]> {

        const retorno: Array<UsuarioEsqueciSenhaResponse> = []
        
        const usuario = await this.usuarioRepository.listarUsuarioEsqueciSenha(data.email);        
        
        const listagemUsuario = new UsuarioEsqueciSenhaResponse()
        
        listagemUsuario.Registros = usuario
        
        retorno.push(listagemUsuario)
        
        return retorno
    }
}