import { Button, TableFooter, TableRow } from '@mui/material'
import { ResultsTableFooterProps } from '../../types/ResultsTable'

import * as S from './styles'

const ResultsTableFooter = <DataItem extends Record<string, any>>({
  isLoading,
  columns,
  onLoadMore,
  hasNextPage,
  error
}: ResultsTableFooterProps<DataItem>) => (
  <TableFooter>
    {isLoading && (
      <TableRow>
        <S.LastCell colSpan={columns.length} align={'center'}>
          Loading...
        </S.LastCell>
      </TableRow>
    )}
    <TableRow>
      {hasNextPage && !isLoading && !error && (
        <S.LastCell colSpan={columns.length} align={'center'}>
          <Button data-testid={'load-more'} onClick={onLoadMore}>
            Load more...
          </Button>
        </S.LastCell>
      )}
    </TableRow>
  </TableFooter>
)

export default ResultsTableFooter
