import { IArquivo } from "src/shared/IArquivo";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { ServicoRepository } from "../repository/servicos.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarServicosService {
    constructor(
        private servicosRepository: ServicoRepository
    ) { }

    async execute(): Promise<IArquivo> {
        
        let buscaServicos = await this.servicosRepository.get().find()                      
    
        let filename = ""
        let content = ""

        if (buscaServicos.length === 0) {
            return {
                filename,
                encoding: '',
                content
            }
        }
        let row = 1

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet("Arquivo_Exportacao_de_Servicos")
                
        workSheet.addRow([
            'Id',
            'Descrição',
            'Valor',
            'Duração',
            'Ativo'            
        ]).font = { bold: true };

        for (const item of buscaServicos) {
            workSheet.addRow([
                item.id ? item.id : '',
                item.descricao ? item.descricao : '',                
                item.valor ? item.valor : '',
                item.duracao ? item.duracao : '',
                item.ativo ? item.ativo : ''
            ])
        }

        ajustarColunasExcel(workSheet)

        const xlsx = await workbook.xlsx.writeBuffer() as Buffer

        filename = "Arquivo_Exportacao_de_Servicos.xlsx"
        content = xlsx.toString("base64")

        return {
            filename,
            encoding: "base64",
            content

        } 
    }
}