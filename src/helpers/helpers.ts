import { __ as trans } from '@squareboat/nestjs-localization/dist/src/helpers';

export function __(message: string, options?: object): string {
  return trans(message, global.lang, options).replace(
    'ERR::INVALID KEY ==> ',
    '',
  );
}
