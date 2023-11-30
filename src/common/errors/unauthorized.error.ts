import { UnauthorizedException } from "@nestjs/common";

export function throwUnauthorizedError(message?: string) {
    throw new UnauthorizedException(message ?? 'Acesso negado.')
}