import { __ as trans } from '@squareboat/nestjs-localization/dist/src/helpers';

export function __(message: string, options?: object): string {
  const lang = global.request ? global.request.headers['lang'] : 'en';
  return trans(message, lang, options);
}
