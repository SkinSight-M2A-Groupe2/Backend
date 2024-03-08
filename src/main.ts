import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as session from 'express-session';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('SkinSight')
    .setDescription('SkinSight API description')
    .setVersion('1.0')
    .addTag('skinsight')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs/v1', app, document);

  app.use(helmet());
/*   app.use(cookieParser());
  app.use(csurf({ cookie: true })); */
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
