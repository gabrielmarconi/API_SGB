import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUsuariosDTO } from "./dto/createUsuarios.dto";
import { AlterarSenhaService, CreateUsuarioService, DeleteUsuarioService, EnviarEmailEsqueciSenhaService, ExportarUsuariosService, GetUsuarioService, UpdateUsuarioService } from "./services";
import { SkipGuard } from "../auth/constants/skipGuardc.constants";
import { AlterarSenhaDTO } from "./dto/alterarSenha.dto";
import { UpdateUsuariosDTO } from "./dto/updateUsuarios.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EnviarEmailEsqueciSenhaDTO } from "./dto/enviarEmailEsqueciSenha.dto";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { Usuario, UsuarioExportacao } from "./models/usuario.model";
import { UsuarioEsqueciSenhaResponse } from "./models/usuarioEsqueciSenha.model";
import { UsuarioEsqueciSenhaService } from "./services/usuarioEsqueciSenha.service";
import { UsuarioEsqueciSenhaDTO } from "./dto/usuarioEsqueciSenha.dto";

@ApiBearerAuth()
@ApiTags('Usuários')
@Controller('usuario')
export class UsuariosController {
    constructor(
        private createUsuarioService: CreateUsuarioService,
        private getUsuarioService: GetUsuarioService,
        private deleteUsuarioService: DeleteUsuarioService,
        private updateUsuarioService: UpdateUsuarioService,
        private alterarSenhaService: AlterarSenhaService,
        private exportarUsuariosService: ExportarUsuariosService,
        private enviarEmailEsqueciSenhaService: EnviarEmailEsqueciSenhaService,
        private usuarioEsqueciSenhaService: UsuarioEsqueciSenhaService
    ) {}
    
    @ApiDataResponse({ isArray: true, type: Usuario })
    @ApiErrorResponse()
    @Post()
    @SkipGuard()
    async post(@Body() usuario: CreateUsuariosDTO) {
        return await this.createUsuarioService.execute(usuario)
    }

    @ApiDataResponse({ isArray: true, type: Usuario })
    @ApiErrorResponse()
    @Get()
    async get(@Query('propertieName') propertieName: string, @Query('propertieValue') propertieValue: any) {
        if (propertieName && propertieValue)
            return await this.getUsuarioService.execute(propertieName, propertieValue)
        return await this.getUsuarioService.execute()
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.deleteUsuarioService.execute(id)
    }

    @ApiDataResponse({ isArray: true, type: Usuario })
    @ApiErrorResponse()
    @Put(':id')
    async update(@Param('id') id: number, @Body() usuario: UpdateUsuariosDTO) {
        return await this.updateUsuarioService.execute(id, usuario)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @Put('/alterar-senha/:id')
    async alterarSenha(@Param('id') id: number, @Body() usuario: AlterarSenhaDTO) {
        return await this.alterarSenhaService.execute(id, usuario)
    }

    @ApiDataResponse({ isArray: true, type: UsuarioExportacao })
    @ApiErrorResponse()
    @Post('/exportar')    
    async exportarUsuarios() {
        return await this.exportarUsuariosService.execute()
    }

    @ApiDataResponse({ isArray: true, type: UsuarioEsqueciSenhaResponse })
    @ApiErrorResponse()
    @SkipGuard()
    @Post('/esqueci-senha')
    async usuarioEsqueciSenha(@Body() usuario: UsuarioEsqueciSenhaDTO) {
        return await this.usuarioEsqueciSenhaService.execute(usuario)
    }

    @ApiDataResponse({ isBoolean: true, type: Boolean })
    @ApiErrorResponse()
    @SkipGuard()
    @Post('/enviar-email/esqueci-senha')
    async esqueciSenha(@Body() usuario: EnviarEmailEsqueciSenhaDTO) {
        return await this.enviarEmailEsqueciSenhaService.execute(usuario)
    }
}