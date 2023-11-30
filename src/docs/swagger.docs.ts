import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocs {
    setupDocs = (app: INestApplication) => {
        const config = new DocumentBuilder()
            .setTitle('API Sistema de Gestão de Barbearias')
            .setDescription('API responsável pela aplicação SGB.')
            .setVersion('1.0')
            //.addTag('Health Check', 'Endpoint para teste da api.')
            .addTag('Anexos', 'Endpoint responsável por gerenciar os arquivos do SGB.')
            .addTag('Atendimentos', 'Endpoint responsável por gerenciar as funções de atendimentos.')
            .addTag('Clientes', 'Endpoint responsável por gerenciar as funções de clientes.')
            .addTag('Formas Pagamento', 'Endpoint responsável por gerenciar as funções de formas de pagamento.')
            .addTag('Funcionários', 'Endpoint responsável por gerenciar as funções de funcionários.')
            .addTag('Indicadores', 'Endpoint responsável por gerenciar os indicadores.')
            .addTag('Serviços', 'Endpoint responsável por gerenciar os serviços.')
            .addTag('Usuários', 'Endpoint responsável por gerenciar os usuários.')
            .addBearerAuth({
                type: "http",
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
                name: 'JWT',
                description: 'Inserir JWT Token'
            })
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }
}