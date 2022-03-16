/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  Render,
  Request,
  Res,
  UseGuards,
  Post,
  UseFilters,
  Body,
  Query,
  Redirect,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { __ } from 'src/helpers/helpers';
import {
  AuthenticatedGuard,
  AuthGuardFilter,
  NoAuthGuardFilter,
  UnAuthenticatedGuard,
} from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(UnAuthenticatedGuard)
  @UseFilters(NoAuthGuardFilter)
  @Get('login')
  @Render('login')
  async loginPage(@Query('redirect') redirect: string) {
    return { redirect: redirect || '/logviewer' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    //let html = `<a id="logv" href="/logviewer">Go to Logviewer</a>`;
    const html = `<script> window.location.href='${req.body.redirect}'; </script>`;
    return html;
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthGuardFilter)
  @Get('logout')
  async logout(@Request() req, @Res() res) {
    req.session.destroy();
    return res.redirect('/auth/login');
  }
}
