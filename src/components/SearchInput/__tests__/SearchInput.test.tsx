import { fireEvent, render, screen } from '@testing-library/react'
import SearchInput from '../SearchInput'

jest.mock('../../../hooks/useDebounce', () => ({
  __esModule: true,
  default: (eventHandler: (...args: any[]) => any) => eventHandler
}))

describe('SearchInput', () => {
  it('should render the search input', () => {
    render(<SearchInput onSearch={() => {}} />)

    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
  })

  it('should call the onSearch callback with the input value', () => {
    const onSearchMock = jest.fn()
    render(<SearchInput onSearch={onSearchMock} />)

    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'react' } })

    expect(onSearchMock).toHaveBeenCalledWith('react')
  })

  it('should use the provided value prop', () => {
    render(<SearchInput onSearch={() => {}} value="react" />)

    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toHaveValue('react')
  })
})
