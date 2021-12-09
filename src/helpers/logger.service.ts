import * as fs from 'fs';
import { basename } from 'path';

export const LOG_CHANNEL_SINGLE = 'single';
export const LOG_CHANNEL_DAILY = 'daily';
export const LOG_LEVEL_DEBUG = 'debug';
export const LOG_LEVEL_ERROR = 'error';
export const LOG_LEVEL_WARN = 'warning';
export const LOG_FILE_STREAM = 'file';
export const LOG_STDOUT_STREAM = 'stdout';
export const LOG_BOTH_STREAM = 'file_stdout';

export class MyLogger {
  constructor(private logFile?: string) {}

  write(msg: string, level?: string) {
    console.log(msg, level, this.logFile, '', 3);
  }
}

export function logger() {
  let logChannel = LOG_CHANNEL_SINGLE;
  if (process.env.LOG_CHANNEL === LOG_CHANNEL_DAILY)
    logChannel = LOG_CHANNEL_DAILY;

  const logStdout = process.stdout;

  //usage console.log('hello log', LOG_LEVEL_DEBUG, 'debug.log', LOG_STREAM_FILE)
  console.log = async function (
    message: string,
    level = LOG_LEVEL_DEBUG,
    logFile = 'debug.log',
    writeStream = process.env.APP_DEBUG === 'true'
      ? LOG_BOTH_STREAM
      : LOG_FILE_STREAM,
    ...optionalParams: any[]
  ) {
    new Promise((resolve) => setTimeout(resolve, 10000));

    //finding file name and line
    const i = optionalParams[0] || 2;
    const fileNline = basename(
      new Error().stack.split('\n')[i].split('(')[1],
    ).split(':');
    const fileInfo = `${fileNline[0]}:${fileNline[1]}`;
    //

    const log = {
      id: +new Date() /*current timestamp number*/,
      time: new Date(),
      level: level,
      fileInfo: fileInfo,
      message: message,
    };

    if (logChannel === LOG_CHANNEL_DAILY && logFile === 'debug.log') {
      logFile = `${new Date().toISOString().split('T')[0]}_${logFile}`;
    }
    const logFilePath = `./storage/logs/${logFile}`;

    if (writeStream === LOG_STDOUT_STREAM) {
      logStdout.write(message + '\n');
    } else if (writeStream === LOG_FILE_STREAM) {
      fs.writeFileSync(logFilePath, JSON.stringify(log) + ',\n', { flag: 'a' });
    } else {
      fs.writeFileSync(logFilePath, JSON.stringify(log) + ',\n', { flag: 'a' });
      logStdout.write(message + '\n');
    }
  };
}
