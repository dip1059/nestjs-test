import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
//import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
// import { AppAuthMiddleware } from './middlewares/app-authentication.middleware';
import { ProductModule } from './products/products.module';
import { UserAndPostModule } from './users_posts/users_posts.module';
import { LogviewerModule } from './logviewer/logviewer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LocalizationModule } from '@squareboat/nestjs-localization/dist/src';
import { AppAuthMiddleware } from './middlewares/app-authentication.middleware';
import { localization } from './middlewares/localization.middlewares';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/graphql*'],
    }),
    LocalizationModule.register({
      path: join(__dirname, '..', 'resources/lang/'),
      fallbackLang: 'en',
    }),
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
    AuthModule,
    ProductModule,
    UserAndPostModule,
    LogviewerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(localization).forRoutes('/');
    consumer.apply(AppAuthMiddleware).forRoutes('graphql');
  }
}
