import * as fs from 'fs';
import * as util from 'util';
import { basename } from 'path';

export const LOG_CHANNEL_SINGLE = 'single';
export const LOG_CHANNEL_DAILY = 'daily';
export const LOG_LEVEL_DEBUG = 'debug';
export const LOG_LEVEL_ERROR = 'error';
export const LOG_LEVEL_WARN = 'warning';

export function logger(file = 'debug.log') {
  const type = process.env.LOG_CHANNEL || LOG_CHANNEL_SINGLE;

  /* if (type === LOG_CHANNEL_DAILY) {
    file = `${new Date().toISOString().split('T')[0]}_${file}`;
  }
  const debug_log_file = `./storage/logs/${file}`;
  const debugFileWriteStream = fs.createWriteStream(debug_log_file, {
    flags: 'a',
  }); */

  const log_stdout = process.stdout;

  //usage console.log(msg, level, file, outputType)
  console.log = async function (message: string, ...optionalParams: any[]) {
    const log = {
      id: +new Date() /*current timestamp number*/,
      time: new Date(),
      level: LOG_LEVEL_DEBUG,
      fileInfo: '',
      message: '',
    };
    const opParmLen = optionalParams.length;

    // fs.writeFileSync('./storage/logs/debug.log', 'test\n', { flag: 'a' });

    //finding custom file name from last 2 index of optional Params
    let log_file: any;
    for (let i = opParmLen - 1; i > opParmLen - 2; i--) {
      if (i < 0) break;
      const customFile = optionalParams[i] || '';
      if (isLogFile(customFile)) {
        log_file = fs.createWriteStream(`./storage/logs/${customFile}`, {
          flags: 'a',
        });
        break;
      }
    }
    //
    if (!log_file) {
      if (type === LOG_CHANNEL_DAILY) {
        file = `${new Date().toISOString().split('T')[0]}_${file}`;
      }
      const debug_log_file = `./storage/logs/${file}`;
      const debugFileWriteStream = fs.createWriteStream(debug_log_file, {
        flags: 'a',
      });
      log_file = debugFileWriteStream;
    }

    //finding log level from last 3 index of optional Params
    for (let i = opParmLen - 1; i > opParmLen - 3; i--) {
      if (i < 0) break;
      const logLevel = optionalParams[i] || '';
      if (logLevel === LOG_LEVEL_ERROR || logLevel === LOG_LEVEL_WARN) {
        log.level = logLevel;
        break;
      }
    }
    //

    //finding file name and line
    const file_n_line = basename(
      new Error().stack.split('\n')[2].split('(')[1],
    ).split(':');
    log.fileInfo = `${file_n_line[0]}:${file_n_line[1]}`;
    //

    //merging values as message string except last 3 index from optional params
    optionalParams.forEach((val, index, arr) => {
      if (index >= arr.length - 3) return;
      message += ' ' + val;
    });
    //

    log.message = message;

    //finding output type from last index of optional Params
    const output = optionalParams[optionalParams.length - 1];
    //

    if (output === 'only-console')
      log_stdout.write(util.format(message) + '\n');
    else if (process.env.APP_DEBUG === 'true' || output === 'include-console') {
      log_file.write(util.format(JSON.stringify(log)) + ',\n');
      log_stdout.write(util.format(message) + '\n');
    } else log_file.write(util.format(JSON.stringify(log)) + ',\n');
  };
}

function isLogFile(fileName: string): boolean {
  if (fileName.split('.')[1] === 'log') return true;
  return false;
}
