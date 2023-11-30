import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { GetIndicadoresTotalizadoresService } from "./services/getIndicadoresTotalizadores.service";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { GetIndicadoresTotalizadoresReponse } from "./models/getIndicadoresTotalizadores.model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Indicadores')
@Controller('indicadores')
export class IndicadoresController {
    constructor(        
        private getIndicadoresTotalizadoresService: GetIndicadoresTotalizadoresService
    ) {}

    @ApiDataResponse({ isArray: true, type: GetIndicadoresTotalizadoresReponse })
    @ApiErrorResponse()
    @Get('/totalizador')
    async listarTotalizadores() {
        return await this.getIndicadoresTotalizadoresService.execute()
    }
    
}