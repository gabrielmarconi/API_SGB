import { BadRequestException } from "@nestjs/common";

export function throwBadRequest(message?: string) {
    throw new BadRequestException(message ?? 'Falha na requisicao.')
}