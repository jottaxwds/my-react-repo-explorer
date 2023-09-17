import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export const API_TOKEN = process.env.REACT_APP_GH_API_TOKEN

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${API_TOKEN}`
  },
  cache: new InMemoryCache()
})

const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default ApolloAppProvider
