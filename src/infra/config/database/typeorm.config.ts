import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ConfigTypeOrmMssql implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: this.configService.get('TYPEORM_HOST'),
            port: +this.configService.get('TYPEORM_PORT'),
            username: this.configService.get('TYPEORM_USERNAME'),
            password: this.configService.get('TYPEORM_PASSWORD'),
            database: this.configService.get('TYPEORM_DATABASE'),
            entityPrefix: '',
            entities: [
                'dist/src/modules/**/entities/*.entity{.ts,.js}',
            ],
            synchronize: false,
            migrations: ['dist/src/migrations/*{.ts,.js}'],
            migrationsTableName: 'scripts_customizados',
            migrationsRun: true,
            options: {
                enableArithAbort: true,
                useUTC: true,
            },
        }
    }
}