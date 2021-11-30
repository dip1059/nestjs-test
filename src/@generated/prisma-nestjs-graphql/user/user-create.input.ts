import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostCreateNestedManyWithoutAuthorInput } from '../post/post-create-nested-many-without-author.input';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PostCreateNestedManyWithoutAuthorInput, { nullable: true })
  posts?: PostCreateNestedManyWithoutAuthorInput;
}
