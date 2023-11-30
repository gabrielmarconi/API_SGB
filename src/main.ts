import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { initMiddlewares } from './core/middlewares';
import { loadConfig } from './infra/config';

loadConfig()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initMiddlewares(app)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(process.env.PORT);
}
bootstrap();
