import { ApiProperty } from "@nestjs/swagger"

export class HealthCheck {
    @ApiProperty()
    message: string

    @ApiProperty()
    status: string
}