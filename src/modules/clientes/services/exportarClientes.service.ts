import { IArquivo } from "src/shared/IArquivo";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { ClienteRepository } from "../repository/clientes.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarClientesService {
    constructor(
        private clientesRepository: ClienteRepository
    ) { }

    async execute(): Promise<IArquivo> {

        
        let buscaClientes = await this.clientesRepository.get().find()                       
    
        let filename = ""
        let content = ""

        if (buscaClientes.length === 0) {
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
            'IdUsuario'                    
        ]).font = { bold: true };

        for (const item of buscaClientes) {
            workSheet.addRow([
                item.id ? item.id : '',
                item.idUsuario ? item.idUsuario : '',                
            ])
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