import { fireEvent, render, screen } from '@testing-library/react'
import useReactRepos from '../hooks/useReactRepos'
import { repositoriesDefaultData } from '../Mocks/repositories-sample-data'
import ReactRepos from '../ReactRepos'

jest.mock('../hooks/useReactRepos')

const defaultHookOutput = {
  repositoriesState: {
    hasNextPage: false,
    repositories: [],
    sortBy: 'name',
    sortOrder: 'asc',
    searchValue: '',
    totalItems: 0
  },
  error: undefined,
  loading: false,
  onSortChange: jest.fn(),
  onSearchValueChange: jest.fn(),
  onLoadMore: jest.fn()
}

describe('ReactRepos page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  describe('General behaviour', () => {
    it('Should render without errors', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput })
      render(<ReactRepos />)
      expect(screen.getByTestId('react-repos')).toBeInTheDocument()
    })

    it('Should show no-results message when results table is empty', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput })
      render(<ReactRepos />)
      expect(screen.getByTestId('no-results')).toBeInTheDocument()
    })

    it('Should NOT show no-results message when results table is NOT empty', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({
        ...defaultHookOutput,
        repositoriesState: {
          ...defaultHookOutput.repositoriesState,
          repositories: repositoriesDefaultData
        }
      })
      render(<ReactRepos />)
      expect(screen.queryByTestId('no-results')).not.toBeInTheDocument()
    })

    it('Shows an error message when there is an error', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput })
      const errorMessage = 'There was an error getting results... try again!'
      render(<ReactRepos />)
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
      // Simulate an error
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput, error: 'error!' })

      render(<ReactRepos />)
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('Should triggers `onSearchValueChange` after some time when `search-input` changes its value', () => {
      jest.useFakeTimers()
      const onSearchValueChangeMock = jest.fn()
      ;(useReactRepos as jest.Mock).mockReturnValue({
        ...defaultHookOutput,
        onSearchValueChange: onSearchValueChangeMock
      })
      render(<ReactRepos />)
      fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'react' } })
      jest.runAllTimers()
      expect(onSearchValueChangeMock).toHaveBeenCalledWith('react')
    })
  })

  describe('Sorting behaviour', () => {
    it('Should triggers `onSortChange` when a sortable header is clicked', () => {
      const onSortChangeMock = jest.fn()
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput, onSortChange: onSortChangeMock })
      render(<ReactRepos />)
      const nameHeadCell = screen.queryAllByTestId('head-cell')[0]
      fireEvent.click(nameHeadCell)
      expect(onSortChangeMock).toHaveBeenCalledWith('name', 'asc')
    })

    it('Should change column sort order when clicked on the same column header:', () => {
      const onSortChangeMock = jest.fn()
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput, onSortChange: onSortChangeMock })
      render(<ReactRepos />)
      const nameHeadCell = screen.queryAllByTestId('head-cell')[0]
      fireEvent.click(nameHeadCell)
      expect(onSortChangeMock).toHaveBeenCalledWith('name', 'asc')
      fireEvent.click(nameHeadCell)
      expect(onSortChangeMock).toHaveBeenCalledWith('name', 'desc')
    })

    it('Should set default initial sort order as `desc` when new column is clicked to sort by', () => {
      const onSortChangeMock = jest.fn()
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput, onSortChange: onSortChangeMock })
      render(<ReactRepos />)
      const [nameHeadCell, starsHeadCell] = screen.queryAllByTestId('head-cell')
      fireEvent.click(nameHeadCell)
      expect(onSortChangeMock).toHaveBeenCalledWith('name', 'asc')
      fireEvent.click(starsHeadCell)
      expect(onSortChangeMock).toHaveBeenCalledWith('stars', 'desc')
    })
  })

  describe('LoadMore behaviour', () => {
    it('Should NOT show `LoadMore` button if there are no results', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({ ...defaultHookOutput })
      render(<ReactRepos />)
      expect(screen.queryByTestId('load-more')).not.toBeInTheDocument()
    })

    it('Should NOT show `LoadMore` if there are no more results based on `hasNextPage` value', () => {
      ;(useReactRepos as jest.Mock).mockReturnValue({
        ...defaultHookOutput,
        repositoriesState: {
          ...defaultHookOutput.repositoriesState,
          repositories: repositoriesDefaultData
        }
      })
      render(<ReactRepos />)
      expect(screen.queryByTestId('load-more')).not.toBeInTheDocument()
    })

    it('Should trigger `onLoadMore` button click', () => {
      const onLoadMoreMock = jest.fn()
      ;(useReactRepos as jest.Mock).mockReturnValue({
        ...defaultHookOutput,
        repositoriesState: {
          ...defaultHookOutput.repositoriesState,
          repositories: repositoriesDefaultData,
          hasNextPage: true
        },
        onLoadMore: onLoadMoreMock
      })
      render(<ReactRepos />)
      expect(screen.queryByTestId('load-more')).toBeInTheDocument()
      fireEvent.click(screen.getByTestId('load-more'))
      expect(onLoadMoreMock).toHaveBeenCalled()
    })
  })
})
