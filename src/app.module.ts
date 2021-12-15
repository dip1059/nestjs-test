import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/app.config';
import { GraphqlConfig } from './configs/graphql.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, GraphqlConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/graphql*'],
    }),
    LocalizationModule.register({
      path: join(__dirname, '..', 'resources/lang/'),
      fallbackLang: 'en',
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get<GqlModuleOptions>('graphql');
      },
      inject: [ConfigService],
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
