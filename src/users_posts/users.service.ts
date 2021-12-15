import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserCreateInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create.input';
import { BaseResponse } from 'src/helpers/base-response.service';
import { __ } from 'src/helpers/helpers';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UserService extends BaseResponse {
  constructor(private prisma: PrismaService) {
    super();
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    // delete user.password;
    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: UserCreateInput): Promise<User> {
    data.password = await hash(data.password, 10);
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
