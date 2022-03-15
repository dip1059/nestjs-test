import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './helpers/logger.service';
import { ConfigService } from '@nestjs/config';
import { AppConfigInterface } from './configs/app.config';
import * as passport from 'passport';
import f = require('session-file-store');

async function bootstrap() {
  logger();
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());

  //using functional middleware
  // app.use(localization);

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'resources/views'));
  app.setViewEngine('hbs');

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfigInterface>('app');

  await app.listen(appConfig.port);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  console.log(`Server started at: localhost:${appConfig.port}`);
}
bootstrap();
