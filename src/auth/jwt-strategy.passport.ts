import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { __ } from 'src/helpers/helpers';
import { UserService } from 'src/users_posts/users.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'my-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const user = this.userService.user({ id: payload.id });
    if (!user)
      throw new UnauthorizedException({
        success: false,
        message: __('Invalid token'),
        data: null,
      });

    return user;
  }
}
