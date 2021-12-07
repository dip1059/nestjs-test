import { Controller, Get, Render, Query, Res } from '@nestjs/common';
import { LogviewerService } from './logviewer.service';
// import * as hbs from 'hbs';

// hbs.registerHelper('helper_name', function (options) {
//   return 'helper value';
// });
// hbs.registerPartial('partial_name', 'partial value');

@Controller('logviewer')
export class LogviewerController {
  constructor(private readonly logviewerService: LogviewerService) {}

  @Get()
  @Render('logviewer')
  getLogs(@Query('file') file: string) {
    if (file === '') file = null;
    return { logs: this.logviewerService.getLogs(file) };
  }

  @Get('clean-file')
  cleanFile(@Query('file') file: string, @Res() res) {
    this.logviewerService.cleanFile(file);
    return res.redirect('/logviewer');
  }
}
