import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDataResponse, ApiErrorResponse, SkipAuth } from "src/common/decorators";
import { HealthCheck } from "./models/healthCheck.model";

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController {

    @ApiDataResponse({ isArray: false, type: HealthCheck })
    @ApiErrorResponse()
    @SkipAuth()
    @Get()
    get() {
        return {
            message: 'API SBG',
            status: 'OK'
        }
    }
}