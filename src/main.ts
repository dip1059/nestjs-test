import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { appAuth } from './middlewares/app-authentication.middleware';
import { PrismaService } from './prisma.service';
import * as fs from 'fs';
import * as util from 'util';

//logging configuration
const log_file = fs.createWriteStream('./storage/logs/debug.log', {
  flags: 'w',
});
const log_stdout = process.stdout;
console.log = function (message, ...optionalParams) {
  //
  optionalParams.forEach((val) => (message += ' ' + val));
  log_file.write(util.format(message) + '\n');
  log_stdout.write(util.format(message) + '\n');
};
//

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //using functional middleware
  //app.use(appAuth);

  await app.listen(3000);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
