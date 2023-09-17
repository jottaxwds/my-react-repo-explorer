import { Table } from '@mui/material'
import { PaginatedSortableTableProps, SortOrderType } from '../../types/ResultsTable'
import ResultsTableBody from './ResultsTableBody'
import ResultsTableFooter from './ResultsTableFooter'
import ResultsTableHead from './ResultsTableHead'
import * as S from './styles'

const PaginatedSortableTable = <DataItem extends Record<string, any>>({
  items,
  columns,
  onLoadMore,
  onSortChange,
  totalItems = 0,
  isLoading,
  hasNextPage = false,
  sortBy: initSortBy,
  sortOrder: initSortOrder = SortOrderType.DESC,
  error
}: PaginatedSortableTableProps<DataItem>) => {
  return (
    <S.ResultsTable>
      <S.TotalItems data-testid={'total-items'}>{totalItems !== 0 ? `Total: ${totalItems}` : <br />}</S.TotalItems>
      <Table>
        <ResultsTableHead columns={columns} sortBy={initSortBy} sortOrder={initSortOrder} onSortChange={onSortChange} />
        <ResultsTableBody items={items} columns={columns} isLoading={isLoading} />
        <ResultsTableFooter
          columns={columns}
          isLoading={isLoading}
          error={error}
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
        />
      </Table>
    </S.ResultsTable>
  )
}

export default PaginatedSortableTable
