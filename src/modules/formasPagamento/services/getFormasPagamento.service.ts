import { Injectable } from "@nestjs/common";
import { FormaPagamentoRepository } from "../repository/formasPagamento.repository";

@Injectable()
export class GetFormaPagamentoService {
    constructor(
        private formaPagamentoRepository: FormaPagamentoRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.formaPagamentoRepository.get().find({
            where: clausulaWhere
        })
    }
}