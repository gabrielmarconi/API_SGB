import { Injectable } from "@nestjs/common";
import { AtendimentoRepository } from "../repository/atendimentos.repository";

@Injectable()
export class GetAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.atendimentoRepository.get().find({
            where: clausulaWhere
        })
    }
}