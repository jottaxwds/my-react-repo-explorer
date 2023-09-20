import { act, renderHook } from '@testing-library/react'
import { useSearchRepositoriesLazyQuery } from '../../../../codegen/generated'
import { SortOrderType } from '../../../../types/ResultsTable'
import useReactRepos from '../useReactRepos'

jest.mock('../../../../codegen/generated', () => ({
  ...jest.requireActual,
  useSearchRepositoriesLazyQuery: jest.fn()
}))

describe('useReactRepos', () => {
  it('Should call `searchRepositories` on init with default values', () => {
    const searchRepositoriesMock = jest.fn()
    ;(useSearchRepositoriesLazyQuery as jest.Mock).mockReturnValue([
      searchRepositoriesMock,
      { loading: false, error: undefined }
    ])

    renderHook(() => useReactRepos())
    expect(searchRepositoriesMock).toHaveBeenCalled()
    expect(searchRepositoriesMock).toHaveBeenCalledWith({
      variables: { first: 10, queryString: 'topic:ReactJS  language:javascript sort:name-asc' }
    })
  })

  it('Should call `searchRepositories` when `onLoadMore` is called', () => {
    const searchRepositoriesMock = jest.fn()
    ;(useSearchRepositoriesLazyQuery as jest.Mock).mockReturnValue([
      searchRepositoriesMock,
      { loading: false, error: undefined }
    ])

    const { result } = renderHook(() => useReactRepos())
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(1)
    result.current.onLoadMore()
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(2)
  })

  it('Should call `searchRepositories` when `onSortChange` is called', () => {
    const searchRepositoriesMock = jest.fn()
    ;(useSearchRepositoriesLazyQuery as jest.Mock).mockReturnValue([
      searchRepositoriesMock,
      { loading: false, error: undefined }
    ])

    const { result } = renderHook(() => useReactRepos())
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(1)
    act(() => {
      result.current.onSortChange('stars', SortOrderType.ASC)
    })
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(2)
    expect(searchRepositoriesMock).toHaveBeenCalledWith({
      variables: { first: 10, queryString: 'topic:ReactJS  language:javascript sort:stars-asc' }
    })
  })

  it('Should call `searchRepositories` when `onSearchChange` is called', () => {
    const searchRepositoriesMock = jest.fn()
    ;(useSearchRepositoriesLazyQuery as jest.Mock).mockReturnValue([
      searchRepositoriesMock,
      { loading: false, error: undefined }
    ])

    const { result } = renderHook(() => useReactRepos())
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(1)
    act(() => {
      result.current.onSearchValueChange('my repos')
    })
    expect(searchRepositoriesMock).toHaveBeenCalledTimes(2)
    expect(searchRepositoriesMock).toHaveBeenCalledWith({
      variables: { first: 10, queryString: 'topic:ReactJS my repos language:javascript sort:name-asc' }
    })
  })
})
