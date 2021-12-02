import { Module } from '@nestjs/common';
import { LogviewerService } from './logviewer.service';
import { LogviewerController } from './logviewer.controller';

@Module({
  controllers: [LogviewerController],
  providers: [LogviewerService],
})
export class LogviewerModule {}
