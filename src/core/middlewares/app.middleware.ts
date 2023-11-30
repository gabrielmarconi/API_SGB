import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as compression from 'compression';
import * as express from "express";
import helmet from "helmet";
import { SwaggerDocs } from "src/docs/swagger.docs";
import { SecurityHeaderInterceptor } from "../interceptors";

export function initMiddlewares(app: INestApplication) {
    app.use(compression());
    app.use(helmet())
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: false }));
    app.enableCors()
    app.useGlobalInterceptors(
        new SecurityHeaderInterceptor(),
    )
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true, //dispara a excecao quando alguma propriedade passada nao estiver definida no dto
        }),
    )
    app.setGlobalPrefix('api')
    new SwaggerDocs().setupDocs(app)
}