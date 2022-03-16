import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './helpers/logger.service';
import * as session from 'express-session';
import * as passport from 'passport';
import f = require('session-file-store');

async function bootstrap() {
  logger();
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
  });

  app.useGlobalPipes(new ValidationPipe());

  //passport & session
  // app.set('trust proxy', 1); // trust first proxy

  const FileStore = f(session);

  app.use(
    session({
      store: new FileStore({ path: './storage/sessions' }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      //cookie: { secure: true },
      cookie: {
        maxAge: 60 * 60 * 24 * 365 * 1000, //1 year
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  //

  //using functional middleware
  // app.use(localization);

  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'resources/views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT || 3000);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  console.log(
    `Server started at: http://localhost:${process.env.APP_PORT || 3000}`,
  );
}
bootstrap();
