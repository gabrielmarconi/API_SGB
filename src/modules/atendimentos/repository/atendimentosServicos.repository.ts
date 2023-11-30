import { Injectable } from "@nestjs/common";
import { AtendimentoServicoEntity } from "../entities/atendimentosServicos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "src/core/repository";

@Injectable()
export class AtendimentoServicoRepository extends BaseRepository<AtendimentoServicoEntity> {    
    constructor(
        @InjectRepository(AtendimentoServicoEntity)        
        atendimentosServicos: Repository<AtendimentoServicoEntity>
    ) {
        super(atendimentosServicos)
    } 
}