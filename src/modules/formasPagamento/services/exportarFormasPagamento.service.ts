import { IArquivo } from "src/shared/IArquivo";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { FormaPagamentoRepository } from "../repository/formasPagamento.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarFormasPagamentoService {
    constructor(
        private formasPagamentoRepository: FormaPagamentoRepository
    ) { }

    async execute(): Promise<IArquivo> {

        
        let buscaFormasPagamento = await this.formasPagamentoRepository.get().find()        
    
        let filename = ""
        let content = ""

        if (buscaFormasPagamento.length === 0) {
            return {
                filename,
                encoding: '',
                content
            }
        }
        let row = 1

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet("Arquivo_Exportacao_de_Formas_de_Pagamento")
                
        workSheet.addRow([
            'Id',
            'Descrição'                    
        ]).font = { bold: true };

        for (const item of buscaFormasPagamento) {
            workSheet.addRow([
                item.id ? item.id : '',
                item.descricao ? item.descricao : '',                
            ])
        }

        ajustarColunasExcel(workSheet)

        const xlsx = await workbook.xlsx.writeBuffer() as Buffer

        filename = "Arquivo_Exportacao_de_Formas_de_Pagamento.xlsx"
        content = xlsx.toString("base64")

        return {
            filename,
            encoding: "base64",
            content

        } 
    }
}