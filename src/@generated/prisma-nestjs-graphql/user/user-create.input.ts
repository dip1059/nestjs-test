import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostCreateNestedManyWithoutAuthorInput } from '../post/post-create-nested-many-without-author.input';
import * as Val from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  @Val.IsEmail()
  email!: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  @Val.IsNotEmpty()
  name?: string;

  @Field(() => PostCreateNestedManyWithoutAuthorInput, { nullable: true })
  posts?: PostCreateNestedManyWithoutAuthorInput;
}
