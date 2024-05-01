import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        // {
        //   emit: 'stdout',
        //   level: 'query',
        // },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      errorFormat: 'colorless',
    });
  }
  private logger = new Logger('DatabaseService');
  async onModuleInit() {
    try {
      this.$on('query' as never, (event: Prisma.QueryEvent) => {
        // console.log('Query: ' + event.query);
        // console.log('Params: ' + event.params);
        console.debug('Duration: ' + event.duration + 'ms');
      });

      await this.$connect();
      this.logger.log('Connected successfully to database');
    } catch (error) {
      this.logger.log('Error connecting to database', error.message);
      process.exit();
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
