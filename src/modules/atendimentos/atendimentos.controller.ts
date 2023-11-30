import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateAtendimentosDTO } from "./dto/createAtendimentos.dto";
import { ConcederDescontoAtendimentoService, ConfirmarAtendimentoService, CreateAtendimentoService, DeleteAtendimentoService, GetAtendimentoService, GetListagemAtendimentosService, UpdateAtendimentoService, VerificaAtendimentoExistenteService } from "./services";
import { ExportarAtendimentosService } from "./services/exportarAtendimentos.service";
import { ConfirmarAtendimentoDTO } from "./dto/confirmarAtendimentos.dto";
import { ConcederDescontoAtendimentoDTO } from "./dto/concederDescontoAtendimentos.dto";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { GetListagemAtendimentosResponse } from "./models/getListagemAtendimentos.model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetListagemAtendimentosServicosService } from "./services/getListagemAtendimentosServicos.service";
import { Atendimento, AtendimentoExportacao } from "./models/atendimento.model";
import { VerificaAtendimentoExistenteResponse } from "./models/verificaAtendimentoExistente.model";
import { VerificaAtendimentoExistenteDTO } from "./dto/verificaAtendimentoExistente.dto";

@ApiBearerAuth()
@ApiTags('Atendimentos')
@Controller('/atendimentos')
export class AtendimentosController {
    constructor(
        private createAtendimentoService: CreateAtendimentoService,
        private getAtendimentoService: GetAtendimentoService,
        private deleteAtendimentoService: DeleteAtendimentoService,
        private updateAtendimentoService: UpdateAtendimentoService,
        private exportarAtendimentosService: ExportarAtendimentosService,
        private confirmarAtendimentoService: ConfirmarAtendimentoService,
        private concederDescontoAtendimentoService: ConcederDescontoAtendimentoService,
        private getListagemAtendimentosService: GetListagemAtendimentosService,
        private getListagemAtendimentosServicosService: GetListagemAtendimentosServicosService,
        private verificaAtendimentoExistenteService: VerificaAtendimentoExistenteService
    ) {}

    @ApiDataResponse({ isArray: true, type: Atendimento })
    @ApiErrorResponse()
    @Post()
    async post(@Body() atendimento: CreateAtendimentosDTO) {
        return await this.createAtendimentoService.execute(atendimento)
    }

    @ApiDataResponse({ isArray: true, type: Atendimento })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getAtendimentoService.execute(propertieName, propertieValue)
        return await this.getAtendimentoService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteAtendimentoService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: Atendimento })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() atendimento: CreateAtendimentosDTO) {
        return await this.updateAtendimentoService.execute(id, atendimento)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Put('/confirmar/:id')
    async confirmarAtendimentos(@Param('id') id: number, @Body() atendimento: ConfirmarAtendimentoDTO) {
        return await this.confirmarAtendimentoService.execute(id, atendimento)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Put('/conceder-desconto/:id')
    async concederDescontoAtendimentos(@Param('id') id: number, @Body() atendimento: ConcederDescontoAtendimentoDTO) {
        return await this.concederDescontoAtendimentoService.execute(id, atendimento)
    }

    @ApiDataResponse({ isArray: true, type: AtendimentoExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarAtendimentos() {
        return await this.exportarAtendimentosService.execute()
    }

    @ApiDataResponse({ isArray: true, type: GetListagemAtendimentosResponse })
    @ApiErrorResponse()
    @Get('/listagem/registros')
    async getListarAtendimentos(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: number) {
        return await this.getListagemAtendimentosService.execute(propertieName, propertieValue)
    }

    @ApiDataResponse({ isArray: true, type: GetListagemAtendimentosResponse })
    @ApiErrorResponse()
    @Get('/listagem/servicos/:id')
    async getListarAtendimentosServicos(@Param('id') id: number) {
        return await this.getListagemAtendimentosServicosService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: VerificaAtendimentoExistenteResponse })
    @ApiErrorResponse()
    @Post('/verificar/existente')
    async atendimentoExistente(@Body() dadosVerificacao: VerificaAtendimentoExistenteDTO) {
        return await this.verificaAtendimentoExistenteService.execute(dadosVerificacao)
    }
}