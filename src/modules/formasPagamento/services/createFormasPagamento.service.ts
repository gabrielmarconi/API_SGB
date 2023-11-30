import { Injectable } from "@nestjs/common";
import { CreateFormasPagamentoDTO } from "../dto/createFormasPagamento.dto";
import { FormaPagamentoEntity } from "../entities/formasPagamento.entity";
import { FormaPagamentoRepository } from "../repository/formasPagamento.repository";

@Injectable()
export class CreateFormaPagamentoService {
    constructor(
        private formaPagamentoRepository: FormaPagamentoRepository
    ) {}

    async execute(data: CreateFormasPagamentoDTO): Promise<FormaPagamentoEntity> {
        const formaPagamento = new FormaPagamentoEntity(data)
        
        return await this.formaPagamentoRepository.save(formaPagamento)
    }
}