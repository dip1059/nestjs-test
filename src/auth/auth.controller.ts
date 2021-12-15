import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: { username: string; password: string }) {
    return this.authService.login(data.username, data.password);
  }
}
