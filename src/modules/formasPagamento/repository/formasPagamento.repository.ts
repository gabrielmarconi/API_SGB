import { Injectable } from "@nestjs/common";
import { FormaPagamentoEntity } from "../entities/formasPagamento.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "src/core/repository";

@Injectable()
export class FormaPagamentoRepository extends BaseRepository<FormaPagamentoEntity> {    
    constructor(
        @InjectRepository(FormaPagamentoEntity)        
        formasPagamento: Repository<FormaPagamentoEntity>
    ) {
        super(formasPagamento)
    }
}