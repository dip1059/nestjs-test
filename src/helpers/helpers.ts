import { __ as trans } from '@squareboat/nestjs-localization/dist/src/helpers';

export function __(message: string, options?: object): string {
  return trans(message, global.lang, options).replace(
    'ERR::INVALID KEY ==> ',
    '',
  );
}

export function sleep(milliseconds: number): void {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
