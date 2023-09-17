import { TableBody, TableCell, TableRow } from '@mui/material'
import { ResultsTableBodyProps } from '../../types/ResultsTable'

const ResultsTableBody = <DataItem extends Record<string, any>>({
  items,
  columns,
  isLoading
}: ResultsTableBodyProps<DataItem>) => {
  return (
    <TableBody>
      {items.length ? (
        items.map((item, index) => (
          <TableRow key={index}>
            {columns.map(column => (
              <TableCell key={`tc-${String(column.id)}`}>{column.displayValue(item)}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <></>
      )}
      {!items.length && !isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length} align={'center'} data-testid={'no-results'}>
            No Results
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </TableBody>
  )
}

export default ResultsTableBody
