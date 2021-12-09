import { Prisma } from '.prisma/client';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from 'src/@generated/prisma-nestjs-graphql/post/post.model';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { MyLogger } from 'src/helpers/logger.service';
import { PostService } from './posts.service';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  private logger: MyLogger;
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {
    this.logger = new MyLogger('usersxx.log');
  }

  @Query(() => [User])
  async getUsers(
    @Context() context,
    @Args('first', { nullable: true, type: () => Int }) first?: number,
    @Args('last', { nullable: true, type: () => Int }) last?: number,
  ): Promise<User[]> {
    console.log('get users', 'warning');
    let sortOrder: Prisma.SortOrder;
    let take: number;
    if (first) {
      sortOrder = 'asc';
      take = first;
    } else {
      sortOrder = 'desc';
      take = last;
    }
    return this.userService.users({
      take: take,
      orderBy: { id: sortOrder },
    });
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User | null> {
    this.logger.write('hello from get user');
    return this.userService.user({ email: email });
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User): Promise<Post[]> {
    const { id } = user;
    return this.postService.posts({ where: { authorId: id } });
  }

  @Mutation(() => User)
  async createUser(
    @Args('data', { type: () => UserCreateInput }) data: UserCreateInput,
  ): Promise<User> {
    return this.userService.createUser(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true, type: () => String }) name: string,
    @Args('phone', { nullable: true, type: () => String }) phone: string,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id: id },
      data: { name: name, phone: phone },
    });
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userService.deleteUser({ email: email });
  }
}
