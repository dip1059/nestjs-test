import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthToken, LoginInput } from './auth.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthToken)
  login(@Args('loginData') loginData: LoginInput) {
    return this.authService.login(loginData.username, loginData.password);
  }
}
