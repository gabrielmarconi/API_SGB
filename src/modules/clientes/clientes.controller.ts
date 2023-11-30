import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateClientesDTO } from "./dto/createClientes.dto";
import { CreateClienteService, DeleteClienteService, ExportarClientesService, GetClienteService, GetListagemClientesService, UpdateClienteService } from "./services";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { GetListagemClientesReponse } from "./models/getListagemClientes.model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Cliente, ClienteExportacao } from "./models/cliente.model";

@ApiBearerAuth()
@ApiTags('Clientes')
@Controller('/clientes')
export class ClientesController {
    constructor(
        private createClienteService: CreateClienteService,
        private getClienteService: GetClienteService,
        private deleteClienteService: DeleteClienteService,
        private updateClienteService: UpdateClienteService,
        private exportarClientesService: ExportarClientesService,
        private getListagemClientesService: GetListagemClientesService
    ) {}

    @ApiDataResponse({ isArray: true, type: Cliente })
    @ApiErrorResponse()
    @Post()
    async post(@Body() cliente: CreateClientesDTO) {
        return await this.createClienteService.execute(cliente)
    }

    @ApiDataResponse({ isArray: true, type: Cliente })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getClienteService.execute(propertieName, propertieValue)
        return await this.getClienteService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteClienteService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: Cliente })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() cliente: CreateClientesDTO) {
        return await this.updateClienteService.execute(id, cliente)
    }

    @ApiDataResponse({ isArray: true, type: ClienteExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarClientes() {
        return await this.exportarClientesService.execute()
    }

    @ApiDataResponse({ isArray: true, type: GetListagemClientesReponse })
    @ApiErrorResponse()
    @Get('/listagem/registros')
    async getListarClientes(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: number) {
        return await this.getListagemClientesService.execute(propertieName, propertieValue)
    }
}