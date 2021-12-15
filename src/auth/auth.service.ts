import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { __ } from 'src/helpers/helpers';
import { compare } from 'bcryptjs';
import { BaseResponse } from 'src/helpers/base-response.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    super();
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: username },
    });
    if (!user)
      throw new NotFoundException(this.errorResponse(__('User not found.')));
    if (!(await compare(password, user.password)))
      throw new BadRequestException(
        this.errorResponse(__('Wrong credentials.')),
      );
    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
