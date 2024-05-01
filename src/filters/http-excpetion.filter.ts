import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private logger = new Logger('ExceptionHandler');
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let responseError = ctx.getResponse() as any;

    if (typeof exception.getResponse == 'function')
      responseError = exception.getResponse();
    ctx.getResponse();
    const { httpAdapter } = this.httpAdapterHost;
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = responseError.message || 'Something Went Wrong';
    if (exception && exception.code && exception.code == 'P2002'){
      message = `${exception?.meta?.target ?? 'data'} already exist on ${exception?.meta?.modelName ?? ''} table`;
      status = HttpStatus.CONFLICT
      
    }
    const responseBody = {
      success: false,
      statusCode: status,
      error: responseError.error || 'Internal server error',
      message,
      errors: responseError.errors || [],
    };

    this.logger.debug(exception.message);

    this.logger.error(responseBody);

    httpAdapter.reply(response, responseBody, status);
  }
}
