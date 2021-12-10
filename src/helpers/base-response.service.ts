import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { __ } from './helpers';

@ObjectType()
export class ResponseData {
  @Field(() => Boolean)
  success: boolean;

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  data: any;
}

export class BaseResponse {
  protected successResponse(data = null, message = ''): ResponseData {
    return { success: true, message: message, data: data };
  }
  protected errorResponse(message?: string, data = null): ResponseData {
    return {
      success: false,
      message: message || __('Something went wrong'),
      data: data,
    };
  }
}
