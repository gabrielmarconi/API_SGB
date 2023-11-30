import { Injectable } from "@nestjs/common";
import { CreateFormasPagamentoDTO } from "../dto/createFormasPagamento.dto";
import { FormaPagamentoEntity } from "../entities/formasPagamento.entity";
import { FormaPagamentoRepository } from "../repository/formasPagamento.repository";
import { throwNotFoundError } from "src/common/errors";
import { FORMASPAGAMENTO_CONSTANTS } from "../constants/formasPagamento.constants";

@Injectable()
export class UpdateFormaPagamentoService {
    constructor(
        private formaPagamentoRepository: FormaPagamentoRepository
    ) {}

    async execute(id: number, data: CreateFormasPagamentoDTO) {
        const formaPagamentoAlteracao = await this.formaPagamentoRepository.get().findOne({
            where: { 'id': id }
        })
        if (!formaPagamentoAlteracao)
            throwNotFoundError(FORMASPAGAMENTO_CONSTANTS.FORMAPAGAMENTO_NAO_ENCONTRADA)
        const formaPagamento = new FormaPagamentoEntity(data)
        formaPagamento.id = formaPagamentoAlteracao.id
        
        return await this.formaPagamentoRepository.update('id', formaPagamento)
    }
}