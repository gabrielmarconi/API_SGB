import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "../entities/usuarios.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";

@Injectable()
export class UsuarioRepository extends BaseRepository<UsuarioEntity> {
    constructor(
        @InjectRepository(UsuarioEntity)        
        usuarios: Repository<UsuarioEntity>
    ) {
        super(usuarios)
    }

    async listarUsuarioEsqueciSenha(email: string): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/UsuarioEsqueciSenha.sql'), 'utf8');        
        const queryParams = {
            email: email
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
}