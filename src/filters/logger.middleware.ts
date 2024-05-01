import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.info(
      `req:`,

      {
        // headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body, 
        // cookies: req.headers.cookie,
        originalUrl: req.originalUrl,
      },
    );
    if (next) {
      next();
    }
  }
}
