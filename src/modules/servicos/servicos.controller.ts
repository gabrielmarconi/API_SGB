import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateServicosDTO } from "../servicos/dto/createServicos.dto";
import { AtualizarValorServicoService, CreateServicoService, DeleteServicoService, ExportarServicosService, GetServicoService, UpdateServicoService } from "../servicos/services";
import { AtualizarValorServicoDTO } from "./dto/atualizarValoresServicos.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { Servico } from "./models/servico.model";
import { UsuarioExportacao } from "../usuarios/models/usuario.model";

@ApiBearerAuth()
@ApiTags('Serviços')
@Controller('/servicos')
export class ServicosController {
    constructor(
        private createServicoService: CreateServicoService,
        private getServicoService: GetServicoService,
        private deleteServicoService: DeleteServicoService,
        private updateServicoService: UpdateServicoService,
        private exportarServicosService: ExportarServicosService,
        private atualizarValorServicoService: AtualizarValorServicoService
    ) {}

    @ApiDataResponse({ isArray: true, type: Servico })
    @ApiErrorResponse()
    @Post()
    async post(@Body() servico: CreateServicosDTO) {
        return await this.createServicoService.execute(servico)
    }

    @ApiDataResponse({ isArray: true, type: Servico })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getServicoService.execute(propertieName, propertieValue)
        return await this.getServicoService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteServicoService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: Servico })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() servico: CreateServicosDTO) {
        return await this.updateServicoService.execute(id, servico)
    }

    @ApiDataResponse({ isArray: true, type: UsuarioExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarServicos() {
        return await this.exportarServicosService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Put('/atualizar/valores')
    async atualizarValoresServicos(@Body() atendimento: AtualizarValorServicoDTO) {
        return await this.atualizarValorServicoService.execute(atendimento)
    }
}