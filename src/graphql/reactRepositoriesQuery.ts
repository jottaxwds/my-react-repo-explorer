import { gql } from '@apollo/client'

const REACT_REPOSITORIES_QUERY = gql`
  query SearchRepositories($queryString: String!, $first: Int!, $after: String) {
    search(query: $queryString, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          name
          description
          forkCount
          url
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

export default REACT_REPOSITORIES_QUERY
