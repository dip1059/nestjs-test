import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { UserService } from './users.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import {
  ResponseData,
  BaseResponse,
} from 'src/other_services/base.response.service';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';

@Controller()
export class UserAndPostController extends BaseResponse {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {
    super();
  }

  @Get('users')
  async getUsers(): Promise<ResponseData> {
    this.successResponse.data = {
      users: await this.userService.users({}),
    };
    return this.successResponse;
  }

  @Post('users')
  async signupUser(@Body() userData: UserCreateInput): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('users/:email')
  async getUserById(@Param('email') email: string): Promise<ResponseData> {
    const user = await this.userService.user({ email: email });
    if (!user) {
      this.errorResponse.message = 'User not found';
      throw new NotFoundException(this.errorResponse);
    } else this.successResponse.data = user;
    return this.successResponse;
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feeds')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('posts')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
