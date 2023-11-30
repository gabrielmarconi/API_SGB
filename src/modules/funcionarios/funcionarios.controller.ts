import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateFuncionariosDTO } from "./dto/createFuncionarios.dto";
import { CreateFuncionarioService, DeleteFuncionarioService, ExportarFuncionariosService, GetFuncionarioService, UpdateFuncionarioService } from "./services";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { GetListagemFuncionariosReponse } from "./models/getListagemFuncionarios.model";
import { GetListagemFuncionariosService } from "./services/getListagemFuncionarios.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Funcionario, FuncionarioExportacao } from "./models/funcionario.model";

@ApiBearerAuth()
@ApiTags('Funcionários')
@Controller('/funcionarios')
export class FuncionariosController {
    constructor(
        private createFuncionarioService: CreateFuncionarioService,
        private getFuncionarioService: GetFuncionarioService,
        private deleteFuncionarioService: DeleteFuncionarioService,
        private updateFuncionarioService: UpdateFuncionarioService,
        private exportarFuncionariosService: ExportarFuncionariosService,
        private getListagemFuncionariosService: GetListagemFuncionariosService
    ) {}

    @ApiDataResponse({ isArray: true, type: Funcionario })
    @ApiErrorResponse()
    @Post()
    async post(@Body() funcionario: CreateFuncionariosDTO) {
        return await this.createFuncionarioService.execute(funcionario)
    }

    @ApiDataResponse({ isArray: true, type: Funcionario })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getFuncionarioService.execute(propertieName, propertieValue)
        return await this.getFuncionarioService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteFuncionarioService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: Funcionario })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() funcionario: CreateFuncionariosDTO) {
        return await this.updateFuncionarioService.execute(id, funcionario)
    }

    @ApiDataResponse({ isArray: true, type: FuncionarioExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarFuncionarios() {
        return await this.exportarFuncionariosService.execute()
    }

    @ApiDataResponse({ isArray: true, type: GetListagemFuncionariosReponse })
    @ApiErrorResponse()
    @Get('/listagem/registros')
    async getListarFuncionarios() {
        return await this.getListagemFuncionariosService.execute()
    }
}