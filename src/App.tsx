import React from 'react'
import ApolloAppProvider from './services/ApolloAppProvider'
import ReactRepos from './pages/ReactRepos/ReactRepos'

const App: React.FC = () => (
  <ApolloAppProvider>
    <ReactRepos />
  </ApolloAppProvider>
)

export default App
