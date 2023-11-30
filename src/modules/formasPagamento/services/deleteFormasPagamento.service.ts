import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { FORMASPAGAMENTO_CONSTANTS } from "../constants/formasPagamento.constants";
import { FormaPagamentoRepository } from "../repository/formasPagamento.repository";

@Injectable()
export class DeleteFormaPagamentoService {
    constructor(
        private formaPagamentoRepository: FormaPagamentoRepository
    ) {}

    async execute(id: number) {
        const formaPagamentoExclusao = await this.formaPagamentoRepository.get().findOne({
            where: { 'id': id }
        })
        if (!formaPagamentoExclusao)
            throwNotFoundError(FORMASPAGAMENTO_CONSTANTS.FORMAPAGAMENTO_NAO_ENCONTRADA)
        return await this.formaPagamentoRepository.delete('id', formaPagamentoExclusao)
    }
}