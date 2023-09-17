import React from 'react'
import ReactRepos from './pages/ReactRepos/ReactRepos'
import ApolloAppProvider from './services/ApolloAppProvider'

const App: React.FC = () => (
  <ApolloAppProvider>
    <ReactRepos />
  </ApolloAppProvider>
)

export default App
