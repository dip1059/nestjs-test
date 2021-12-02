import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LogviewerService {
  findAll() {
    let data = '[';
    data += fs.readFileSync('./storage/logs/debug.log').toString();
    data = data.slice(0, data.length - 2);
    data += ']';
    const logs = JSON.parse(data);
    // console.log(typeof logs, 'only-console');
    return logs;
  }

  remove(id: number) {
    return `This action removes a #${id} logviewer`;
  }
}
