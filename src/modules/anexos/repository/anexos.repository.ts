import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs";
import * as path from "path";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";
import { Repository } from "typeorm";
import { AnexoEntity } from "../entities/anexos.entity";

@Injectable()
export class AnexosRepository extends BaseRepository<AnexoEntity> {
    constructor(
        @InjectRepository(AnexoEntity)
        anexos: Repository<AnexoEntity>
    ) {
        super(anexos)
    }

    async verificarEntidade(entidade: string): Promise<boolean> {
        const query = fs.readFileSync(path.join(__dirname, './queries/VerificaEntidadeExistente.sql'), 'utf8');
        const queryParams = {
            Entidade: entidade
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno.length > 0
    }
}