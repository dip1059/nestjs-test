import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostsResolver } from './posts.resolver';
import { PostService } from './posts.service';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { UserAndPostController } from './users_posts.controller';

@Module({
  imports: [],
  controllers: [UserAndPostController],
  providers: [
    UserService,
    PostService,
    PrismaService,
    UsersResolver,
    PostsResolver,
  ],
  exports: [UserService, PrismaService],
})
export class UserAndPostModule {}
