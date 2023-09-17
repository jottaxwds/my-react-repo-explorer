import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import useDebounce, { DEFAULT_DEBOUNCE_TIME } from '../../hooks/useDebounce'
import * as S from './styles'

interface SearchInputProps {
  /** Debounced when `SearchInput` updated its `value` */
  onSearch: (value: string) => void
  debounceThreshold?: number
  value?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  value = '',
  debounceThreshold = DEFAULT_DEBOUNCE_TIME
}) => {
  const [searchValue, setSearchValue] = React.useState(value)

  const debouncedSearchHandler = useDebounce(onSearch, debounceThreshold)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: newSearchValue }
    } = event
    setSearchValue(newSearchValue)
    debouncedSearchHandler(newSearchValue)
  }

  return (
    <S.Search>
      <S.SearchIconWrapper>
        <SearchIcon />
      </S.SearchIconWrapper>
      <S.InputBase
        onChange={handleOnChange}
        placeholder="Search Repos…"
        value={searchValue}
        inputProps={{ 'aria-label': 'search', 'data-testid': 'search-input' }}
      />
    </S.Search>
  )
}

export default SearchInput
