import * as fs from 'fs';
import * as util from 'util';
import { basename } from 'path';

export function logger() {
  const debug_log_file = './storage/logs/debug.log';
  const log_file = fs.createWriteStream(debug_log_file, {
    flags: 'a',
  });
  const log_stdout = process.stdout;
  console.log = function (message: string, ...optionalParams: any[]) {
    const log = {
      id: +new Date() /*current timestamp number*/,
      time: new Date(),
      /* .toISOString()
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, ''), // delete the dot and everything after */
      fileInfo: '',
      message: '',
    };

    const file_n_line = basename(
      new Error().stack.split('\n')[2].split('(')[1],
    ).split(':');
    log.fileInfo = `${file_n_line[0]}:${file_n_line[1]}`;

    optionalParams.forEach((val, index, arr) => {
      if (index === arr.length - 1) return;
      message += ' ' + val;
    });
    log.message = message;
    const output = optionalParams[optionalParams.length - 1];
    if (output === 'only-console')
      log_stdout.write(util.format(message) + '\n');
    else if (output === 'include-console') {
      log_file.write(util.format(JSON.stringify(log)) + ',\n');
      log_stdout.write(util.format(message) + '\n');
    } else log_file.write(util.format(JSON.stringify(log)) + ',\n');
  };
}
