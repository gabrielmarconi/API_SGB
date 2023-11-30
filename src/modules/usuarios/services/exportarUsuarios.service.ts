import { IArquivo } from "src/shared/IArquivo";
import { UsuarioRepository } from "../repository/usuarios.repository";
import { ajustarColunasExcel } from "src/shared/rotinas.excel";
import * as ExcelJS from 'exceljs';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExportarUsuariosService {
    constructor(
        private usuariosRepository: UsuarioRepository
    ) { }

    async execute(): Promise<IArquivo> {
        
        let buscaUsuarios = await this.usuariosRepository.get().find()
    
        let filename = ""
        let content = ""

        if (buscaUsuarios.length === 0) {
            return {
                filename,
                encoding: '',
                content
            }
        }
        let row = 1

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet("Arquivo_Exportacao_de_Usuarios")
                
        workSheet.addRow([
            'Id',
            'Nome',
            'E-mail',
            'Senha',
            'Administrador',
            'Telefone',
            'DataNascimento'
        ]).font = { bold: true };

        for (const item of buscaUsuarios) {
            workSheet.addRow([
                item.id ? item.id : '',
                item.nome ? item.nome : '',             
                item.email ? item.email : '',
                item.senha ? item.senha : '',
                item.administrador ? item.administrador : '',
                item.telefone ? item.telefone : '',
                item.dataNascimento ? item.dataNascimento : ''   
            ])
        }

        ajustarColunasExcel(workSheet)

        const xlsx = await workbook.xlsx.writeBuffer() as Buffer

        filename = "Arquivo_Exportacao_de_Usuarios.xlsx"
        content = xlsx.toString("base64")

        return {
            filename,
            encoding: "base64",
            content

        } 
    }
}