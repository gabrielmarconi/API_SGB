import { Body, Controller, Delete, Get, Post, Put, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { CreateAnexoDTO } from "./dto/createAnexo.dto";
import { DeleteAnexoDTO } from "./dto/deleteAnexo.dto";
import { GetAnexoDTO } from "./dto/getAnexo.dto";
import { UpdateAnexoDTO } from "./dto/updateAnexo.dto";
import { Anexo } from "./models/anexo.model";
import { GetAnexoReponse } from "./models/getAnexosResponse.model";
import { CreateAnexoService, DeleteAnexoService, GetAnexoService, UpdateAnexoService } from "./services";

@ApiBearerAuth()
@ApiTags('Anexos')
@Controller('anexo')
export class AnexosController {
    constructor(
        private createAnexoService: CreateAnexoService,
        private deleteAnexoService: DeleteAnexoService,
        private getAnexosService: GetAnexoService,
        private updateAnexosService: UpdateAnexoService
    ) {}

    @ApiDataResponse({ isArray: true, type: Anexo })
    @ApiErrorResponse()
    @Post()
    async post(@Body() anexo: CreateAnexoDTO, @Req() request) {
        return await this.createAnexoService.execute(anexo, request.parametersRequest)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete()
    async delete(@Query() anexo: DeleteAnexoDTO, @Req() request) {
        return await this.deleteAnexoService.execute(anexo, request.parametersRequest)
    }

    @ApiDataResponse({ isArray: true, type: GetAnexoReponse })
    @ApiErrorResponse()
    @Get()
    async get(@Query() anexo: GetAnexoDTO, @Req() request) {
        return await this.getAnexosService.execute(anexo, request.parametersRequest)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Put()
    async put(@Body() anexo: UpdateAnexoDTO, @Req() request) {
        return await this.updateAnexosService.execute(anexo, request.parametersRequest)
    }
}