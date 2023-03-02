import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from '@controllers/typeDefs';
import resolvers from '@controllers/resolvers';
import setUpIoC from './ioc';

function createApolloServer(): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
}

async function main() {
  setUpIoC();

  const { url } = await startStandaloneServer(createApolloServer(), {
    listen: { port: 5000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main().then(() => {
  console.log('Server started');
});
