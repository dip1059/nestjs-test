import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
//import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { AppAuthMiddleware } from './middlewares/app-authentication.middleware';
import { ProductModule } from './products/products.module';
import { UserAndPostModule } from './users_posts/users_posts.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        debug: true,
        installSubscriptionHandlers: true,
        sortSchema: true,
        /* formatError: (error: GraphQLError): GraphQLFormattedError => {
          return error.originalError instanceof BaseException
            ? error.originalError.serialize()
            : error;
        }, */
        context: ({ req }): object => {
          //console.log('req.ip: ', req.ip); // Here I have the ip
          return { req };
        },
      }),
    }),
    ProductModule,
    UserAndPostModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppAuthMiddleware).forRoutes('graphql');
  }
}
