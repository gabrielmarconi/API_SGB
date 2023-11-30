import { Injectable } from "@nestjs/common";
import { CreateServicosDTO } from "../dto/createServicos.dto";
import { ServicoEntity } from "../entities/servicos.entity";
import { ServicoRepository } from "../repository/servicos.repository";

@Injectable()
export class CreateServicoService {
    constructor(
        private servicoRepository: ServicoRepository
    ) {}

    async execute(data: CreateServicosDTO): Promise<ServicoEntity> {
        const servico = new ServicoEntity(data)        
        return await this.servicoRepository.save(servico)
    }
}