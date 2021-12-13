import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users_posts/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy.passport';
import { SessionSerializer } from './session-serialize.passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    LocalStrategy,
    AuthService,
    SessionSerializer,
    UserService,
    PrismaService,
  ],
})
export class AuthModule {}
