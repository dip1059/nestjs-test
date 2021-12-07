import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './configs/logger';

async function bootstrap() {
  logger();
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //using functional middleware
  // app.use(localization);

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'resources/views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT || 3000);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
