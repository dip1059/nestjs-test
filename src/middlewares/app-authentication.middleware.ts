import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { basename } from 'path';

@Injectable()
export class AppAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      basename(__filename) +
        ':' +
        new Error().stack.split('\n')[1].split(':')[1], //line number
      req.headers['app_key'],
    );

    if (req.header('app_key') === process.env.APP_KEY) next();
    else
      throw new UnauthorizedException({
        success: false,
        message: 'Request from unauthorize app',
        data: null,
      });
  }
}

//functional middleware

/* import { UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';

export function appAuth(req: Request, res: Response, next: NextFunction) {
  if (req.headers['app_key'] === process.env.APP_KEY) next();
  else
    throw new UnauthorizedException({
      success: false,
      message: 'Request from unauthorize app',
      data: null,
    });
}
 */
