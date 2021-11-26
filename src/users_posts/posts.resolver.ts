import { Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/@generated/prisma-nestjs-graphql/post/post.model';
import { PostService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {

  constructor(private postService: PostService) {}

  @Query(() => [Post])
  getPosts(): Promise<Post[]> {
    return this.postService.posts({})
  }
}
