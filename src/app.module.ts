import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductModule } from './products/products.module';
import { UserAndPostModule } from './users_posts/users_posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
    ProductModule,
    UserAndPostModule,
  ],
})
export class AppModule {}
