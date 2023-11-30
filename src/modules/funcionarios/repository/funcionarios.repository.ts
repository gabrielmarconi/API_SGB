import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";
import { FuncionarioEntity } from "../entities/funcionarios.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";

@Injectable()
export class FuncionarioRepository extends BaseRepository<FuncionarioEntity> {    
    constructor(
        @InjectRepository(FuncionarioEntity)        
        funcionarios: Repository<FuncionarioEntity>
    ) {
        super(funcionarios)
    }

    async listarFuncionarios(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/ListagemFuncionarios.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
}