import { SortOrderType } from './ResultsTable'

export interface Repository {
  name: string
  description: string
  stargazers: number
  forkCount: number
}

export interface RepositoriesState {
  repositories: Repo[]
  hasNextPage: boolean
  sortBy: string
  sortOrder: SortOrderType
  endCursor: string | null
  totalItems: number
  searchValue: string
}

export interface QueryStringProps {
  sortBy: string
  sortOrder: SortOrderType
  searchValue: string
}

export interface Repo {
  forks: number
  id: string
  name: string
  stars: number
  url: string
}
