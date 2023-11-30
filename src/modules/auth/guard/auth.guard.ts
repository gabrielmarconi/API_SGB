import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWT_CONSTANTS } from "../constants/jwt.constants";
import { IS_PUBLIC_KEY } from "../constants/skipGuardc.constants";
import { throwUnauthorizedError } from "src/common/errors/unauthorized.error";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // verifica se deve ignorar a rota
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (isPublic)
            return true

        const request = context.switchToHttp().getRequest()
        const token = this.extractToken(request)

        if (!token)
            throwUnauthorizedError()

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: JWT_CONSTANTS.secret })
            //colocando os dados do payload na requisicao para futuras manipulacoes
            request['user'] = payload
        } catch {
            throwUnauthorizedError()
        }
        return true
    }

    private extractToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}