import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    //console.log(request.body.redirect);
    //const res = context.switchToHttp().getResponse<Response>();
    await super.logIn(request);
    //res.redirect(request.body.redirect);
    return result;
  }
}
