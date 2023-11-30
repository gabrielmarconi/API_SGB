import { IArquivo } from "src/shared/IArquivo";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { FuncionarioRepository } from "../repository/funcionarios.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarFuncionariosService {
    constructor(
        private funcionariosRepository: FuncionarioRepository
    ) { }

    async execute(): Promise<IArquivo> {

        
        let buscaFuncionarios = await this.funcionariosRepository.get().find()
                          
        let filename = ""
        let content = ""

        if (buscaFuncionarios.length === 0) {
            return {
                filename,
                encoding: '',
                content
            }
        }
        let row = 1

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet("Arquivo_Exportacao_de_Funcionarios")
                
        workSheet.addRow([
            'Id',
            'IdUsuario'                    
        ]).font = { bold: true };

        for (const item of buscaFuncionarios) {
            workSheet.addRow([
                item.id ? item.id : '',
                item.idUsuario ? item.idUsuario : '',                
            ])
        }

        ajustarColunasExcel(workSheet)

        const xlsx = await workbook.xlsx.writeBuffer() as Buffer

        filename = "Arquivo_Exportacao_de_Funcionarios.xlsx"
        content = xlsx.toString("base64")

        return {
            filename,
            encoding: "base64",
            content

        } 
    }
}