/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();
    this.$on<any>('error', (e: any) => {
      console.log('Query: ' + e.message, 'error');
    });
    this.$on<any>('warn', (e: any) => {
      console.log('Query: ' + e.message, 'warn');
    });
    if (process.env.QUERY_DEBUG === 'true') {
      this.$on<any>('query', (e: any) => {
        console.log('Query: ' + e.query, 'debug', undefined, 'stdout');
        console.log('Params: ' + e.params, 'debug', undefined, 'stdout');
        console.log(
          'Duration: ' + e.duration + 'ms',
          'debug',
          undefined,
          'stdout',
        );
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
