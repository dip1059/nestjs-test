import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostCreateInput } from 'src/@generated/prisma-nestjs-graphql/post/post-create.input';
import { Post } from 'src/@generated/prisma-nestjs-graphql/post/post.model';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { PostService } from './posts.service';
import { UserService } from './users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    console.log('get posts', 'error', 'post.log', 'only-console');
    return this.postService.posts({});
  }

  @Mutation(() => Post)
  async createPost(
    @Args('post', { type: () => PostCreateInput }) post: PostCreateInput,
  ): Promise<Post> {
    return this.postService.createPost(post);
  }

  @ResolveField(() => User)
  async author(@Parent() post: Post): Promise<User> {
    const { authorId } = post;
    return this.userService.user({ id: authorId });
  }
}
