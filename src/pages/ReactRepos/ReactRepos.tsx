import React from 'react'
import ResultsTable from '../../components/ResultsTable/ResultsTable'
import SearchInput from '../../components/SearchInput/SearchInput'

import AlertError from '../../components/Alert/Alert'
import columnsConfig from '../../components/ResultsTable/columnsConfig'
import useReactRepos from './hooks/useReactRepos'
import * as S from './styles'

const ReactRepos: React.FC = () => {
  const {
    repositoriesState: { hasNextPage, repositories, sortBy, sortOrder, searchValue, totalItems },
    error,
    loading,
    onSortChange,
    onSearchValueChange,
    onLoadMore
  } = useReactRepos()

  return (
    <S.AppWrapper>
      {error && <AlertError title="Error" message="There was an error getting results... try again!" />}
      <S.Header>
        <SearchInput onSearch={onSearchValueChange} value={searchValue} />
      </S.Header>
      <main data-testid="react-repos">
        <section>
          <ResultsTable
            items={error ? [] : repositories}
            columns={columnsConfig}
            isLoading={loading}
            onLoadMore={onLoadMore}
            onSortChange={onSortChange}
            totalItems={totalItems}
            hasNextPage={hasNextPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            error={error !== undefined}
          />
        </section>
      </main>
    </S.AppWrapper>
  )
}

export default ReactRepos
