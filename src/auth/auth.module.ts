import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users_posts/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy.passport';
import { SessionSerializer } from './session-serialize.passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    AuthService,
    SessionSerializer,
    UserService,
    PrismaService,
  ],
})
export class AuthModule {}
