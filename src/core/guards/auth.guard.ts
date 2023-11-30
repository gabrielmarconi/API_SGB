import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { throwUnauthorizedError } from "src/common/errors";
import { IS_PUBLIC_KEY } from "../../common/decorators/skipAuth.decorator";
import { JWT_CONSTANTS } from "src/modules/auth/constants/jwt.constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private readonly configService: ConfigService
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