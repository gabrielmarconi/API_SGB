import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";
import { ClienteEntity } from "../entities/clientes.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";

@Injectable()
export class ClienteRepository extends BaseRepository<ClienteEntity> {
    constructor(
        @InjectRepository(ClienteEntity)        
        clientes: Repository<ClienteEntity>
    ) {
        super(clientes)
    }    

    async listarClientes(id: number): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/ListagemClientes.sql'), 'utf8');        
        const queryParams = {
            todosClientes: id > 0 ? 1 : 0,
            idUsuario: id
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
}