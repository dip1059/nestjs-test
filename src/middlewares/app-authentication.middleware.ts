import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { __ } from 'src/helpers';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers['app_key']);
    if (
      process.env.APP_DEBUG === 'true' ||
      req.header('app_key') === process.env.APP_KEY
    )
      next();
    else
      throw new UnauthorizedException({
        success: false,
        message: __('Request from unauthorize app'),
        data: null,
      });
  }
}

//functional middleware

/* import { UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { __ } from 'src/helpers';

export function appAuth(req: Request, next: NextFunction) {
  if (
    process.env.APP_DEBUG === 'true' ||
    req.headers['app_key'] === process.env.APP_KEY
  )
    next();
  else
    throw new UnauthorizedException({
      success: false,
      message: __('Request from unauthorize app'),
      data: null,
    });
} */
