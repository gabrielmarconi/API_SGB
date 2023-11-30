import * as fs from "fs";
import * as path from "path";
import { BaseRepository, PrepareQueryCustom } from "src/core/repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IndicadorEntity } from "../entities/indicadores.entity";

@Injectable()
export class IndicadoresRepository extends BaseRepository<IndicadorEntity> {
    constructor(
        @InjectRepository(IndicadorEntity)        
        indicadores: Repository<IndicadorEntity>
    ) {
        super(indicadores)
    }
    
    async totalizadorAtendimentosFuncionario(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosPorFuncionario.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async totalizadorAtendimentosCliente(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosPorCliente.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async totalizadorAtendimentosMes(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosMes.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async totalizadorAtendimentosServico(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosPorServico.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }

    async totalizadorAtendimentosAbertos(): Promise<any> {
        const query = fs.readFileSync(path.join(__dirname, './queries/TotalAtendimentosAbertos.sql'), 'utf8');        
        const consulta = await new PrepareQueryCustom(query, {}).prepare();
        const retorno = await this.executeQuery(consulta)
        return retorno
    }
}