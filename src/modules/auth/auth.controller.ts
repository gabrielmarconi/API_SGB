import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { SkipGuard } from "./constants/skipGuardc.constants";
import { SignDTO } from "./dto/sign.dto";
import { AuthService, GetTipoUsuarioService } from "./services";
import { ApiDataResponse, ApiErrorResponse } from "src/common/decorators";
import { GetTipoUsuarioResponse } from "./models/getTipoUsuario.model";
import { AuthResponse } from "./models/auth.model";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private getTipoUsuarioService: GetTipoUsuarioService
    ) {}

    @ApiDataResponse({ isArray: true, type: AuthResponse })
    @ApiErrorResponse()
    @HttpCode(HttpStatus.OK)
    @SkipGuard()
    @Post()
    async sign(@Body() data: SignDTO) {
        return await this.authService.execute(data.email, data.senha)
    }
    
    @ApiDataResponse({ isArray: true, type: GetTipoUsuarioResponse })
    @ApiErrorResponse()
    @Get('/tipo-usuario/:id')
    async capturarTipoUsuario(@Param('id') id: number) {
        return await this.getTipoUsuarioService.execute(id)
    }
}