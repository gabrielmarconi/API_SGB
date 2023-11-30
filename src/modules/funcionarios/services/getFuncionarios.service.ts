import { Injectable } from "@nestjs/common";
import { FuncionarioRepository } from "../repository/funcionarios.repository";

@Injectable()
export class GetFuncionarioService {
    constructor(
        private funcionarioRepository: FuncionarioRepository
    ) {}

    async execute(propertieName?: string, propertieValue?: any) {
        let clausulaWhere = {}
        clausulaWhere[propertieName] = propertieValue
        return await this.funcionarioRepository.get().find({
            where: clausulaWhere
        })
    }
}