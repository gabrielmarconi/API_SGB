import { Injectable } from "@nestjs/common";
import { ServicoEntity } from "../entities/servicos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "src/core/repository";

@Injectable()
export class ServicoRepository extends BaseRepository<ServicoEntity> {    
    constructor(
        @InjectRepository(ServicoEntity)        
        servicos: Repository<ServicoEntity>
    ) {
        super(servicos)
    }
}