import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.userService.users({});
  }
}
