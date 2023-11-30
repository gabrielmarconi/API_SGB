import { NotFoundException } from "@nestjs/common";

export function throwNotFoundError(message?: string) {
    throw new NotFoundException(message ?? 'Registro nao localizado.')
}