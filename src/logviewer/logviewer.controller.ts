import { Controller, Get, Param, Delete, Render } from '@nestjs/common';
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
  @Render('index')
  findAll() {
    return { logs: this.logviewerService.findAll() };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logviewerService.remove(+id);
  }
}
