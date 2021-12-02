import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { appAuth } from './middlewares/app-authentication.middleware';
import { PrismaService } from './prisma.service';
import * as fs from 'fs';
import * as util from 'util';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
//import { basename } from 'path';

//logging configuration
const debug_log_file = './storage/logs/debug.log';
const log_file = fs.createWriteStream(debug_log_file, {
  flags: 'a',
});
const log_stdout = process.stdout;
console.log = function (message: string, ...optionalParams: any[]) {
  const log = {
    id: +new Date() /*current timestamp number*/,
    time: new Date(),
    message: '',
  };

  /* message =
    basename(__filename) +
    ':' +
    new Error().stack.split('\n')[2].split(':')[1] +
    ' ' +
    message; */

  optionalParams.forEach((val, index, arr) => {
    if (index === arr.length - 1) return;
    message += ' ' + val;
  });
  log.message = message;
  const output = optionalParams[optionalParams.length - 1];
  if (output === 'only-console') log_stdout.write(util.format(message) + '\n');
  else if (output === 'include-console') {
    log_file.write(util.format(JSON.stringify(log)) + ',\n');
    log_stdout.write(util.format(message) + '\n');
  } else log_file.write(util.format(JSON.stringify(log)) + ',\n');
};
//

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //using functional middleware
  //app.use(appAuth);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT || 3000);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
