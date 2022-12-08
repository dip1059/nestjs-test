import {
  Controller,
  Get,
  Render,
  Query,
  Res,
  UseGuards,
  UseFilters,
  StreamableFile,
} from '@nestjs/common';
import { LogviewerService } from './logviewer.service';
import * as glob from 'glob';
import { basename } from 'path';
import * as hbs from 'hbs';
import { Request, Response } from 'express';
import {
  AuthenticatedGuard,
  AuthGuardFilter,
} from 'src/auth/authenticated.guard';
import { __ } from 'src/helpers/helpers';

hbs.registerHelper('__', function (key: string) {
  return __(key);
});
hbs.registerHelper('trans', function (key: string) {
  return __(key);
});
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// hbs.registerPartial('pp', 'partial value');

@UseGuards(AuthenticatedGuard)
@UseFilters(AuthGuardFilter)
// @SkipThrottle()
@Controller('logs')
export class LogviewerController {
  constructor(private readonly logviewerService: LogviewerService) {}

  @Get()
  @Render('logviewer')
  getLogs(@Query('file') file: string) {
    const logFiles = glob.sync('./storage/logs/*.log');
    logFiles.forEach((value, index, logFiles) => {
      logFiles[index] = basename(value);
    });
    logFiles.sort();
    logFiles.reverse();
    if (!file) {
      return { logs: [], fileList: logFiles, file: '' };
    }
    return {
      logs: this.logviewerService.getLogs(file),
      fileList: logFiles,
      file: file,
    };
  }

  @Get('clean-file')
  cleanFile(@Query('file') file: string, @Res() res) {
    if (!file) return res.redirect('/logs');
    this.logviewerService.cleanFile(file);
    return res.redirect('/logs?file=' + file);
  }

  @Get('download-file')
  downloadFile(
    @Query('file') file: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const streamFile = this.logviewerService.downloadFile(file);
      res.attachment(file);
      return new StreamableFile(streamFile);
    } catch (e) {
      return e.message;
    }
  }

  @Get('delete-file')
  deleteFile(@Query('file') file: string, @Res() res) {
    if (!file) return res.redirect('/logs');
    this.logviewerService.deleteFile(file);
    return res.redirect('/logs');
  }
}
