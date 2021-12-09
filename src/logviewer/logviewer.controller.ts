import { Controller, Get, Render, Query, Res } from '@nestjs/common';
import { LogviewerService } from './logviewer.service';
import * as glob from 'glob';
import { basename } from 'path';
import * as hbs from 'hbs';
import { __ } from 'src/helpers/helpers';

hbs.registerHelper('__', function (key: string) {
  return __(key);
});
hbs.registerHelper('trans', function (key: string) {
  return __(key);
});
// hbs.registerPartial('pp', 'partial value');

@Controller('logviewer')
export class LogviewerController {
  constructor(private readonly logviewerService: LogviewerService) {}

  @Get()
  @Render('logviewer')
  getLogs(@Query('file') file: string) {
    const logFiles = glob.sync('./storage/logs/*.log');
    logFiles.forEach((value, index, logFiles) => {
      logFiles[index] = basename(value);
    });
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
    if (!file) return res.redirect('/logviewer');
    this.logviewerService.cleanFile(file);
    return res.redirect('/logviewer?file=' + file);
  }

  @Get('delete-file')
  deleteFile(@Query('file') file: string, @Res() res) {
    if (!file) return res.redirect('/logviewer');
    this.logviewerService.deleteFile(file);
    return res.redirect('/logviewer');
  }
}
