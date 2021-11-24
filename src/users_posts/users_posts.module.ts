import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostService } from './posts.service';
import { UserService } from './users.service';
import { UserAndPostController } from './users_posts.controller';

@Module({
  imports: [],
  controllers: [UserAndPostController],
  providers: [UserService, PostService, PrismaService],
})
export class UserAndPostModule {}
