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
} from '@nestjs/common';
import { __ } from 'src/helpers/helpers';
import {
  AuthenticatedGuard,
  AuthGuardFilter,
} from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('login')
  async loginPage(@Query('redirect') redirect: string) {
    return { redirect: redirect || '/logviewer' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res, @Body('redirect') redirect: string) {
    //return 'logged in';
    return res.redirect(redirect);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthGuardFilter)
  @Get('logout')
  async logout(@Request() req, @Res() res) {
    req.session.destroy();
    return res.redirect('/auth/login');
  }
}
