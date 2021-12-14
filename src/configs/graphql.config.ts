import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

export const GraphqlConfig = registerAs(
  'graphql',
  (): GqlModuleOptions => ({
    playground: true,
    sortSchema: true,
    autoSchemaFile: './src/graphql/schema.gql',
    debug: true,
    installSubscriptionHandlers: true,
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
);
