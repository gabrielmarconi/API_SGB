import { Injectable } from "@nestjs/common";
import { AtendimentoEntity } from "../entities/atendimentos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";
import * as fs from "fs";
import * as path from "path";
import { VerificaAtendimentoExistenteDTO } from "../dto/verificaAtendimentoExistente.dto";

@Injectable()
export class AtendimentoRepository extends BaseRepository<AtendimentoEntity> {    
    constructor(
        @InjectRepository(AtendimentoEntity)        
        atendimentos: Repository<AtendimentoEntity>
    ) {
        super(atendimentos)
    } 

    async totalizadorAtendimentosFuncionario(entidade: string): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosPorFuncionario.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async listarAtendimentos(id: number): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/ListagemAtendimentos.sql'), 'utf8');        
        const queryParams = {
            todosAtendimentos: id > 0 ? 1 : 0,
            idCliente: id
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
    
    async listarAtendimentosServicos(atendimento: number): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/ListagemAtendimentosServicos.sql'), 'utf8');        
        const queryParams = {
            idAtendimento: atendimento
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async verificarAtendimentoExistente(verificacao: any): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/VerificaAtendimentoExistente.sql'), 'utf8');        
        const queryParams = {
            dataInicio: verificacao.dataInicio,
            dataTermino: verificacao.dataTermino,
            idFuncionario: verificacao.idFuncionario,
            todosAtendimentos: verificacao.todosAtendimentos,
            idAtendimento: verificacao.idAtendimento
        }
        const consulta = await new PrepareQueryCustom(query, queryParams).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
}