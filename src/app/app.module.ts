import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { StudentModule } from '../student/student.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/http-excpetion.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { LoggerMiddleware } from 'src/filters/logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./');
        const servePath = '';

        return {
          rootPath: publicDir,
          serveRoot: servePath,
          exclude: ['/api*'],
        };
      })(),
    ),
    DatabaseModule,
    StudentModule,
    MulterModule.register({
      dest: './upload/certifications',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
