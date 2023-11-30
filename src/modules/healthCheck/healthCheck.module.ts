import { Module } from "@nestjs/common";
import { HealthCheckController } from "./healthCheck.controller";

@Module({
    imports: [
    ],
    exports: [
    ],
    controllers: [
        HealthCheckController
    ],
    providers: [
    ]
})
export class HealthCheckModule {}