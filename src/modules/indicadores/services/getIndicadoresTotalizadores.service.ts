import { Injectable } from "@nestjs/common";
import { IndicadoresRepository } from "../repository/indicadores.repository";
import { GetIndicadoresTotalizadoresReponse } from "../models/getIndicadoresTotalizadores.model";

@Injectable()
export class GetIndicadoresTotalizadoresService {
    constructor(
        private indicadoresRepository: IndicadoresRepository
    ) {}

    async execute():Promise<GetIndicadoresTotalizadoresReponse[]> {

        const retorno: Array<GetIndicadoresTotalizadoresReponse> = []

        //realiza as requisicoes em paralelo para otimizar o tempo de resposta
        const [
            atendimentosAbertos,
            atendimentosMes,
            atendimentosPorCliente,
            atendimentosPorFuncionario,
            atendimentosPorServico            
        ] = await Promise.all([
            this.indicadoresRepository.totalizadorAtendimentosAbertos(),
            this.indicadoresRepository.totalizadorAtendimentosMes(),
            this.indicadoresRepository.totalizadorAtendimentosCliente(),
            this.indicadoresRepository.totalizadorAtendimentosFuncionario(),
            this.indicadoresRepository.totalizadorAtendimentosServico()            
        ])

        // Monta os totalizadores
        const indicadoratendimentosAbertos = new GetIndicadoresTotalizadoresReponse()
        indicadoratendimentosAbertos.Modulo = 'Atendimentos'
        indicadoratendimentosAbertos.Detalhes = atendimentosAbertos
        indicadoratendimentosAbertos.Total = atendimentosAbertos.reduce((soma: number, registro: any) => soma += registro.Quantidade, 0)
        indicadoratendimentosAbertos.Indicador = 'Atendimentos abertos'
        retorno.push(indicadoratendimentosAbertos)

        const indicadoratendimentosMes = new GetIndicadoresTotalizadoresReponse()
        indicadoratendimentosMes.Modulo = 'Atendimentos'
        indicadoratendimentosMes.Detalhes = atendimentosMes
        indicadoratendimentosMes.Total = atendimentosMes.reduce((soma: number, registro: any) => soma += registro.Quantidade, 0)
        indicadoratendimentosMes.Indicador = 'Atendimentos no mês'
        retorno.push(indicadoratendimentosMes)

        const indicadoratendimentosPorCliente = new GetIndicadoresTotalizadoresReponse()
        indicadoratendimentosPorCliente.Modulo = 'Atendimentos'
        indicadoratendimentosPorCliente.Detalhes = atendimentosPorCliente
        indicadoratendimentosPorCliente.Total = atendimentosPorCliente.reduce((soma: number, registro: any) => soma += registro.Quantidade, 0)
        indicadoratendimentosPorCliente.Indicador = 'Atendimentos por cliente'
        retorno.push(indicadoratendimentosPorCliente)

        const indicadoratendimentosPorFuncionario = new GetIndicadoresTotalizadoresReponse()
        indicadoratendimentosPorFuncionario.Modulo = 'Atendimentos'
        indicadoratendimentosPorFuncionario.Detalhes = atendimentosPorFuncionario
        indicadoratendimentosPorFuncionario.Total = atendimentosPorFuncionario.reduce((soma: number, registro: any) => soma += registro.Quantidade, 0)
        indicadoratendimentosPorFuncionario.Indicador = 'Atendimentos por funcionário'
        retorno.push(indicadoratendimentosPorFuncionario)
        
        const indicadoratendimentosPorServico = new GetIndicadoresTotalizadoresReponse()
        indicadoratendimentosPorServico.Modulo = 'Atendimentos'
        indicadoratendimentosPorServico.Detalhes = atendimentosPorServico
        indicadoratendimentosPorServico.Total = atendimentosPorServico.reduce((soma: number, registro: any) => soma += registro.Quantidade, 0)
        indicadoratendimentosPorServico.Indicador = 'Atendimentos por serviço'
        retorno.push(indicadoratendimentosPorServico)
        
        return retorno
    }
}