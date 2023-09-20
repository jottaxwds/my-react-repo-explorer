import { useEffect, useState } from 'react'

import { TableHead, TableRow, TableSortLabel } from '@mui/material'
import { ResultsTableHeadProps, SortOrderType } from '../../types/ResultsTable'
import * as S from './styles'

const ResultsTableHead = <DataItem extends Record<string, any>>({
  columns,
  sortBy: initSortBy,
  sortOrder: initSortOrder,
  onSortChange
}: ResultsTableHeadProps<DataItem>) => {
  const [sortBy, setSortBy] = useState<string>(initSortBy)
  const [sortOrder, setSortOrder] = useState<SortOrderType>(initSortOrder ?? SortOrderType.DESC)

  const handleSort = (columnId: string) => () => {
    setSortOrder((prevSortOrder: SortOrderType) => {
      let newSortOrder = prevSortOrder === SortOrderType.ASC ? SortOrderType.DESC : SortOrderType.ASC
      if (sortBy !== columnId) {
        newSortOrder = SortOrderType.ASC
      }
      return newSortOrder
    })
    setSortBy(columnId)
  }

  useEffect(() => {
    onSortChange(sortBy, sortOrder)
  }, [sortBy, sortOrder])

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <S.HeadCell key={`th-${String(column.id)}`} style={column.minColSize ? { minWidth: column.minColSize } : {}}>
            {column.sortable ? (
              <TableSortLabel
                data-testid={'head-cell'}
                active={sortBy === column.id}
                direction={sortBy === column.id ? sortOrder : SortOrderType.ASC}
                onClick={handleSort(column.id as string)}
              >
                {column.headerLabel}
              </TableSortLabel>
            ) : (
              column.headerLabel
            )}
          </S.HeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default ResultsTableHead
