import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { CreateFormasPagamentoDTO } from "./dto/createFormasPagamento.dto";
import { CreateFormaPagamentoService, DeleteFormaPagamentoService, ExportarFormasPagamentoService, GetFormaPagamentoService, UpdateFormaPagamentoService } from "./services";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { FormaPagamento, FormaPagamentoExportacao } from "./models/formaPagamento.model";

@ApiBearerAuth()
@ApiTags('Formas Pagamento')
@Controller('/formas-pagamento')
export class FormasPagamentoController {
    constructor(
        private createFormaPagamentoService: CreateFormaPagamentoService,
        private getFormaPagamentoService: GetFormaPagamentoService,
        private deleteFormaPagamentoService: DeleteFormaPagamentoService,
        private updateFormaPagamentoService: UpdateFormaPagamentoService,
        private exportarFormasPagamentoService: ExportarFormasPagamentoService
    ) {}

    @ApiDataResponse({ isArray: true, type: FormaPagamento })
    @ApiErrorResponse()
    @Post()
    async post(@Body() formaPagamento: CreateFormasPagamentoDTO) {
        return await this.createFormaPagamentoService.execute(formaPagamento)
    }

    @ApiDataResponse({ isArray: true, type: FormaPagamento })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getFormaPagamentoService.execute(propertieName, propertieValue)
        return await this.getFormaPagamentoService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteFormaPagamentoService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: FormaPagamento })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() formaPagamento: CreateFormasPagamentoDTO) {
        return await this.updateFormaPagamentoService.execute(id, formaPagamento)
    }

    @ApiDataResponse({ isArray: true, type: FormaPagamentoExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarFormasPagamento() {
        return await this.exportarFormasPagamentoService.execute()
    }
}