import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LogviewerService {
  getLogs(file?: string) {
    file = './storage/logs/' + file;
    let logs: object[];
    if (!fs.existsSync(file)) return logs;
    const logFile = file || 'debug.log';
    try {
      let logData = fs.readFileSync(logFile).toString();
      if (logData !== '') {
        logData = logData.slice(0, logData.length - 2);
        logData = `[${logData}]`;
        logs = JSON.parse(logData);
      }
    } catch (error) {
      fs.writeFileSync(logFile, '');
      console.log(error.toString());
    }
    return logs;
  }

  cleanFile(file: string) {
    file = './storage/logs/' + file;
    if (fs.existsSync(file)) fs.writeFileSync(file, '');
    return;
  }
}
