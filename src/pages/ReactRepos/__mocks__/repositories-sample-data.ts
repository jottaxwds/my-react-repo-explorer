import REACT_REPOSITORIES_QUERY from '../../../graphql/reactRepositoriesQuery'
import { RepositoriesFragment } from '../../../types/Repositories'

export const queryRepositoriesResponse: RepositoriesFragment[] = [
  {
    name: 'E-CommerceApp',
    url: 'https://github.com/griffinstiens/E-CommerceApp',
    stargazers: { totalCount: 0, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 0
  },
  {
    name: 'react-cadastro-usuarios',
    url: 'https://github.com/dougs007/react-cadastro-usuarios',
    stargazers: { totalCount: 3, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 3
  },
  {
    name: 'AIR_Movies',
    url: 'https://github.com/IFTE-13/AIR_Movies',
    stargazers: { totalCount: 430, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 65
  },
  {
    name: 'busca-cep',
    url: 'https://github.com/dnsouzadev/busca-cep',
    stargazers: { totalCount: 533, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 45
  },
  {
    name: 'react-crud',
    url: 'https://github.com/lucas-salles/react-crud',
    stargazers: { totalCount: 657, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 34
  },
  {
    name: 'robo-friends',
    url: 'https://github.com/sourabh0902/robo-friends',
    stargazers: { totalCount: 234, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 89
  },
  {
    name: 'Hulu-Clone',
    url: 'https://github.com/LakshaySK106/Hulu-Clone',
    stargazers: { totalCount: 111, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 234
  },
  {
    name: 'react_weather_app',
    url: 'https://github.com/ganesh1172/react_weather_app',
    stargazers: { totalCount: 12, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 1
  },
  {
    name: 'React-JS-Portfolio',
    url: 'https://github.com/crsiwal/React-JS-Portfolio',
    stargazers: { totalCount: 897, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 22
  },
  {
    name: 'Amazon-clone',
    url: 'https://github.com/boukrisw/Amazon-clone',
    stargazers: { totalCount: 67, pageInfo: { hasPreviousPage: false, hasNextPage: false } },
    forkCount: 675
  }
]

export const repositoriesDefaultData = [
  { id: '11', name: 'E-CommerceApp', url: 'https://github.com/griffinstiens/E-CommerceApp', stars: 0, forks: 0 },
  {
    id: '12',
    name: 'react-cadastro-usuarios',
    url: 'https://github.com/dougs007/react-cadastro-usuarios',
    stars: 0,
    forks: 0
  },
  { id: '13', name: 'AIR_Movies', url: 'https://github.com/IFTE-13/AIR_Movies', stars: 0, forks: 0 },
  { id: '14', name: 'busca-cep', url: 'https://github.com/dnsouzadev/busca-cep', stars: 0, forks: 0 },
  { id: '15', name: 'react-crud', url: 'https://github.com/lucas-salles/react-crud', stars: 0, forks: 0 },
  { id: '16', name: 'robo-friends', url: 'https://github.com/sourabh0902/robo-friends', stars: 0, forks: 0 },
  { id: '17', name: 'Hulu-Clone', url: 'https://github.com/LakshaySK106/Hulu-Clone', stars: 0, forks: 0 },
  { id: '18', name: 'react_weather_app', url: 'https://github.com/ganesh1172/react_weather_app', stars: 0, forks: 0 },
  { id: '19', name: 'React-JS-Portfolio', url: 'https://github.com/crsiwal/React-JS-Portfolio', stars: 2, forks: 0 },
  { id: '20', name: 'Amazon-clone', url: 'https://github.com/boukrisw/Amazon-clone', stars: 0, forks: 0 }
]

export interface GetMocksProps {
  repositories: RepositoriesFragment[]
  hasNextPage: boolean
  hasError?: boolean
}

export const mocks = ({ repositories, hasNextPage, hasError = false }: GetMocksProps) =>
  hasError
    ? [
        {
          request: {
            query: REACT_REPOSITORIES_QUERY,
            variables: { queryString: 'topic:ReactJS  language:javascript sort:name-asc', first: 10 }
          },
          errors: new Error('error')
        }
      ]
    : [
        {
          request: {
            query: REACT_REPOSITORIES_QUERY,
            variables: { queryString: 'topic:ReactJS  language:javascript sort:name-asc', first: 10 }
          },
          result: {
            data: {
              search: {
                nodes: [...repositories],
                repositoryCount: 20,
                pageInfo: {
                  hasNextPage,
                  endCursor: hasNextPage ? 11 : null
                }
              }
            }
          }
        }
      ]
