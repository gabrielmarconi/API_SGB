import { IArquivo } from "src/shared/IArquivo";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { AtendimentoRepository } from "../repository/atendimentos.repository";
import { AtendimentoServicoRepository } from "../repository/atendimentosServicos.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarAtendimentosService {
    constructor(
        private atendimentosRepository: AtendimentoRepository,
        private atendimentosServicosRepository: AtendimentoServicoRepository
    ) { }

    async execute(): Promise<IArquivo> {

        
        let buscaAtendimentos = await this.atendimentosRepository.get().find()                       
    
        let filename = ""
        let content = ""

        if (buscaAtendimentos.length === 0) {
            return {
                filename,
                encoding: '',
                content
            }
        }
        let row = 1

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet("Arquivo_Exportacao_de_Clientes")
                
        workSheet.addRow([
            'Id',
            'IdCliente',
            'IdFuncionario',
            'IdFormaPagamento',
            'DataHora',
            'Confirmado'                    
        ]).font = { bold: true };

        for (const item of buscaAtendimentos) {            

            workSheet.addRow([
                item.id ? item.id : '',
                item.idCliente ? item.idCliente : '',
                item.idFuncionario ? item.idFuncionario : '',
                item.idFormaPagamento ? item.idFormaPagamento : '',
                item.dataHora ? item.dataHora : '',
                item.confirmado ? item.confirmado : '',
            ])

            let buscaAtendimentosServicos = await this.atendimentosServicosRepository.get().find({
                where: { 'idAtendimento': item.id }
            })

            if (buscaAtendimentosServicos.length > 0) {
                workSheet.addRow([
                    'Id',
                    'IdAtendimento',
                    'IdServico'                                       
                ]).font = { bold: true };

                for (const itemServico of buscaAtendimentosServicos) {
                    workSheet.addRow([
                        itemServico.id ? itemServico.id : '',
                        itemServico.idAtendimento ? itemServico.idAtendimento : '',
                        itemServico.idServico ? itemServico.idServico : ''                        
                    ])
                }
            }
        }

        ajustarColunasExcel(workSheet)

        const xlsx = await workbook.xlsx.writeBuffer() as Buffer

        filename = "Arquivo_Exportacao_de_Clientes.xlsx"
        content = xlsx.toString("base64")

        return {
            filename,
            encoding: "base64",
            content

        } 
    }
}