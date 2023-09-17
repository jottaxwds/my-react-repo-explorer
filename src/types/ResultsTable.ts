export interface ColumnConfig<DataItem> {
  displayValue: (repo: DataItem) => JSX.Element
  id: string
  label: string
  sortable: boolean
  minColSize?: ColSizes
}

export enum ColSizes {
  SM = '110px'
}

export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc'
}

export type OnSortChange = (sortBy: string, sortType: SortOrderType) => void

export interface PaginatedSortableTableProps<DataItem> {
  columns: ColumnConfig<DataItem>[]
  error: boolean
  hasNextPage: boolean
  isLoading: boolean
  items: DataItem[]
  sortBy: string
  sortOrder?: SortOrderType
  totalItems: number
  onLoadMore: () => void
  onSortChange: OnSortChange
}

export interface ResultsTableHeadProps<DataItem> {
  columns: ColumnConfig<DataItem>[]
  sortBy: string
  sortOrder: SortOrderType
  onSortChange: OnSortChange
}

export interface ResultsTableBodyProps<DataItem> {
  items: DataItem[]
  columns: ColumnConfig<DataItem>[]
  isLoading: boolean
}

export interface ResultsTableFooterProps<DataItem> {
  isLoading: boolean
  columns: ColumnConfig<DataItem>[]
  onLoadMore: () => void
  hasNextPage: boolean
  error: boolean
}
