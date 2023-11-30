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
import { ATENDIMENTOS_CONSTANTS } from "../constants/atendimentos.constants";
import { AtendimentoServicoRepository } from "../repository/atendimentosServicos.repository";
import { CreateAtendimentosServicosDTO } from "../dto/createAtendimentosServicos.dto";

@Injectable()
export class UpdateAtendimentoService {
    constructor(
        private atendimentoRepository: AtendimentoRepository,
        private clienteRepository: ClienteRepository,
        private funcionarioRepository: FuncionarioRepository,
        private formaPagamentoRepository: FormaPagamentoRepository,
        private atendimentoServicoRepository: AtendimentoServicoRepository
    ) {}

    async execute(id: number, data: CreateAtendimentosDTO) {

        let servicos: Array<CreateAtendimentosServicosDTO> = [];
        if (data.servicos)
            servicos = data.servicos;
        data.servicos = undefined;

        const atendimentoAlteracao = await this.atendimentoRepository.get().findOne({
            where: { 'id': id }
        })
        if (!atendimentoAlteracao)
            throwNotFoundError(ATENDIMENTOS_CONSTANTS.ATENDIMENTO_NAO_ENCONTRADO)
        const atendimento = new AtendimentoEntity(data)
        atendimento.id = atendimentoAlteracao.id

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

        const retornoAtendimento = await this.atendimentoRepository.update('id', atendimento)
        if (retornoAtendimento) {            
            // busca os valores do banco de dados para verificar quais devem ser excluidos
            const servicosExistentes = await this.atendimentoServicoRepository.get().find({
                where: { 'idAtendimento': retornoAtendimento.id }
            })
            // cria o array de registros a ser excluido
            const servicosExclusao: Array<any> = servicosExistentes.filter(
                (item: any) => !servicos.find(
                    (itemUpdate: any) => itemUpdate.id == item.id
                )
            )

            // percorre o array de item a ser excluido para realizar a exclusao
            for (let servicoExclusao of servicosExclusao) {
                const deleteItens = await this.atendimentoServicoRepository.delete('id', servicoExclusao)                
            }

            //Grava ou Atualiza os serviços do atendimento
            for (let servico of servicos) {
                servico.idAtendimento = retornoAtendimento.id

                if (servico.id != 0 && servico.id != undefined) {
                    const updateServico = await this.atendimentoServicoRepository.update('id', servico);                    
                } else {
                    const criaServico = await this.atendimentoServicoRepository.save(servico);                    
                }
            }
        }
        return retornoAtendimento
    }
}