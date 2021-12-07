import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LogviewerService {
  getLogs(file = 'debug.log') {
    file = './storage/logs/' + file;
    let logs: object[];
    if (!fs.existsSync(file)) return logs;
    const log_file = file || 'debug.log';
    try {
      let logData = fs.readFileSync(log_file).toString();
      if (logData !== '') {
        logData = logData.slice(0, logData.length - 2);
        logData = `[${logData}]`;
        logs = JSON.parse(logData);
      }
    } catch (error) {
      fs.writeFileSync(log_file, '');
      console.log(error.toString());
    }
    return logs;
  }

  cleanFile(file = 'debug.log') {
    file = './storage/logs/' + file;
    if (fs.existsSync(file)) fs.writeFileSync(file, '');
    return;
  }
}
