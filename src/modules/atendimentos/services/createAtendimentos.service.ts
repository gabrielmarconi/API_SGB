import { Injectable } from "@nestjs/common";
import { throwNotFoundError } from "src/common/errors";
import { CLIENTES_CONSTANTS } from "src/modules/clientes/constants/clientes.constants";
import { ClienteRepository } from "src/modules/clientes/repository/clientes.repository";
import { FORMASPAGAMENTO_CONSTANTS } from "src/modules/formasPagamento/constants/formasPagamento.constants";
import { FormaPagamentoRepository } from "src/modules/formasPagamento/repository/formasPagamento.repository";
import { FUNCIONARIOS_CONSTANTS } from "src/modules/funcionarios/constants/funcionarios.constants";
import { FuncionarioRepository } from "src/modules/funcionarios/repository/funcionarios.repository";
import { CreateAtendimentosDTO } from "../dto/createAtendimentos.dto";
import { AtendimentoEntity } from "../entities/atendimentos.entity";
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { CreateAtendimentosServicosDTO } from "../dto/createAtendimentosServicos.dto";
import { CreateAtendimentoServicoService } from "./createAtendimentosServicos.service";
import { ServicoRepository } from "src/modules/servicos/repository/servicos.repository";
import { SERVICOS_CONSTANTS } from "src/modules/servicos/constants/servicos.constants";

@Injectable()
export class CreateAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository,
        private clienteRepository: ClienteRepository,
        private funcionarioRepository: FuncionarioRepository,
        private formaPagamentoRepository: FormaPagamentoRepository,
        private servicoRepository: ServicoRepository,
        private createAtendimentoServicoService: CreateAtendimentoServicoService
    ) {}

    async execute(data: CreateAtendimentosDTO): Promise<AtendimentoEntity> {
        const atendimento = new AtendimentoEntity(data)          

        let servicos: Array<CreateAtendimentosServicosDTO> = [];
        if (data.servicos)
            servicos = data.servicos;
        data.servicos = undefined;

        // verifica se o cliente existe                
        const cliente = await this.clienteRepository.get().find({
            where: { 'id': data.idCliente }
        })
        if (!cliente) 
            throwNotFoundError(CLIENTES_CONSTANTS.CLIENTE_NAO_ENCONTRADO)

        // verifica se o funcionario existe
        const funcionario = await this.funcionarioRepository.get().find({
            where: { 'id': data.idFuncionario }
        })
        if (!funcionario)
            throwNotFoundError(FUNCIONARIOS_CONSTANTS.FUNCIONARIO_NAO_ENCONTRADO)

        if (data.idFormaPagamento) {
            // verifica se a forma de pagamento existe
            const formaPagamento = await this.formaPagamentoRepository.get().find({
                where: { 'id': data.idFormaPagamento }
            })
            if (!formaPagamento)
                throwNotFoundError(FORMASPAGAMENTO_CONSTANTS.FORMAPAGAMENTO_NAO_ENCONTRADA)
        }  
        
        // Preenche o campo valor total
        let valorTotal = 0
        for (let servico of servicos) {
            const servicoExistente = await this.servicoRepository.get().findOne({
                where: { 'id': servico.idServico }
            })
            if (servicoExistente) {
                valorTotal += servicoExistente.valor
            } else {
                throwNotFoundError(SERVICOS_CONSTANTS.SERVICO_NAO_ENCONTRADO)
            }
        }        
        data.valorTotal = valorTotal
        
        const retornoAtendimento = await this.atendimentoRepository.save(atendimento)
        if (retornoAtendimento) {
            // Grava os servicos
            for (let servico of servicos) {
                servico.idAtendimento = retornoAtendimento.id;
                await this.createAtendimentoServicoService.execute(servico);
            }
        }
        return retornoAtendimento
    }
}