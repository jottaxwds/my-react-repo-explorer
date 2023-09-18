import { useEffect, useState } from 'react'

import { uniqueId } from 'lodash'
import {
  Repository,
  SearchRepositoriesQuery,
  SearchRepositoriesQueryVariables,
  useSearchRepositoriesLazyQuery
} from '../../../codegen/generated'
import { QueryStringProps, RepositoriesState } from '../../../types/Repositories'
import { SortOrderType } from '../../../types/ResultsTable'

const defaultRepositoriesState: RepositoriesState = {
  repositories: [],
  hasNextPage: true,
  sortBy: 'repo',
  sortOrder: SortOrderType.DESC,
  endCursor: null,
  totalItems: 0,
  searchValue: ''
}

/**
 * Search and sorting should be done by providing a queryString with the following format:
 * `topic:<MAIN_TOPIC_FOR_SEARCH> <SEARCH_STRINGS> language:<LANGUAGE> sort:<SORT_BY>-<SORT_ORDER>
 * [search reference](https://docs.github.com/en/graphql/reference/queries#search)
 **/
const queryString = ({ sortBy, sortOrder, searchValue }: QueryStringProps) =>
  `topic:ReactJS ${searchValue} language:javascript sort:${sortBy}-${sortOrder}`

const defaultVariables = ({ sortBy, sortOrder, searchValue }: QueryStringProps) =>
  ({
    queryString: queryString({ sortBy, sortOrder, searchValue }),
    first: 10
  } as SearchRepositoriesQueryVariables)

const useReactRepos = () => {
  const [repositoriesState, setRepositoriesState] = useState<RepositoriesState>(defaultRepositoriesState)
  const [searchRepositories, { loading, error }] = useSearchRepositoriesLazyQuery({
    variables: defaultVariables({
      sortBy: repositoriesState.sortBy,
      sortOrder: repositoriesState.sortOrder,
      searchValue: repositoriesState.searchValue
    }),
    fetchPolicy: 'cache-and-network',
    onCompleted: (data: SearchRepositoriesQuery) => {
      const {
        search: {
          nodes,
          repositoryCount,
          pageInfo: { hasNextPage, endCursor }
        }
      } = data
      const newRepositories =
        nodes && nodes.length
          ? (nodes as Repository[]).map(repo => {
              return {
                id: uniqueId(),
                name: repo.name,
                url: repo.url,
                stars: repo.stargazers?.totalCount ?? 0,
                forks: repo.forkCount
              }
            })
          : []

      setRepositoriesState(prevRepositoriesState => ({
        ...prevRepositoriesState,
        repositories: [...prevRepositoriesState.repositories, ...newRepositories],
        hasNextPage,
        endCursor: endCursor ?? null,
        totalItems: repositoryCount
      }))
    }
  })
  useEffect(() => {
    setRepositoriesState(prevRepositoriesState => ({
      ...prevRepositoriesState,
      repositories: [],
      hasNextPage: false,
      endCursor: null
    }))
    searchRepositories({
      variables: defaultVariables({
        sortBy: repositoriesState.sortBy,
        sortOrder: repositoriesState.sortOrder,
        searchValue: repositoriesState.searchValue
      })
    })
  }, [repositoriesState.searchValue, repositoriesState.sortOrder, repositoriesState.sortBy])

  const onLoadMore = () => {
    const { sortBy, sortOrder, searchValue, endCursor } = repositoriesState
    searchRepositories({
      variables: {
        queryString: queryString({
          sortBy,
          sortOrder,
          searchValue
        }),
        first: 10,
        after: endCursor
      }
    })
  }

  const onSortChange = (sortBy: string, sortOrder: SortOrderType) => {
    setRepositoriesState(prevRepositoriesState => ({
      ...prevRepositoriesState,
      sortBy,
      sortOrder
    }))
  }

  const onSearchValueChange = (searchValue: string) =>
    setRepositoriesState(prevRepositoriesState => ({
      ...prevRepositoriesState,
      searchValue
    }))
  return {
    repositoriesState,
    error,
    loading,
    onSortChange,
    onSearchValueChange,
    onLoadMore
  }
}

export default useReactRepos
