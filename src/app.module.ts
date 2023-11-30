import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthGuard } from './core/guards/auth.guard';
import { ResponseInterceptor } from './core/interceptors';
import { ConfigTypeOrmMssql } from './infra/config';
import { HealthCheckModule, UsuariosModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { FormasPagamentoModule } from './modules/formasPagamento/formasPagamento.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { AtendimentosModule } from './modules/atendimentos/atendimentos.module';
import { IndicadoresModule } from './modules/indicadores/indicadores.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ConfigTypeOrmMssql
    }),
    HealthCheckModule,    
    UsuariosModule,
    AuthModule,
    FormasPagamentoModule,
    ServicosModule,
    FuncionariosModule,
    ClientesModule,
    AtendimentosModule,
    IndicadoresModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})

export class AppModule {
  constructor(
    private dataSource: DataSource
  ) {
  }
}
