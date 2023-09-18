import { Repository } from '../codegen/generated'
import { SortOrderType } from './ResultsTable'
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

export type RepositoriesFragment = Pick<Repository, 'name' | 'stargazers' | 'forkCount' | 'url'>
