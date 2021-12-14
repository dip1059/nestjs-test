import { registerAs } from '@nestjs/config';

export interface AppConfigInterface {
  port: number;
}

export const AppConfig = registerAs(
  'app',
  (): AppConfigInterface => ({
    port: Number(process.env.APP_PORT) || 3000,
  }),
);
