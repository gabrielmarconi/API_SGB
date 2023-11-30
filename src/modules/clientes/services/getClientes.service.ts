import { Injectable } from "@nestjs/common";
import { ClienteRepository } from "../repository/clientes.repository";

@Injectable()
export class GetClienteService {
    constructor(
        private clienteRepository: ClienteRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.clienteRepository.get().find({
            where: clausulaWhere
        })
    }
}