import { Injectable } from "@nestjs/common";
import { ServicoRepository } from "../repository/servicos.repository";

@Injectable()
export class GetServicoService {
    constructor(
        private servicoRepository: ServicoRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.servicoRepository.get().find({
            where: clausulaWhere
        })
    }
}