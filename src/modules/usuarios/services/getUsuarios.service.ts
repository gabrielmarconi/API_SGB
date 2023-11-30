import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../repository/usuarios.repository";

@Injectable()
export class GetUsuarioService {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.usuarioRepository.get().find({
            where: clausulaWhere 
        })
    }
}