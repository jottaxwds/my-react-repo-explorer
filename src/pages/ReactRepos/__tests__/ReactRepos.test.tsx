import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import ReactRepos from '../ReactRepos'
import { mocks, queryRepositoriesResponse } from '../__mocks__/repositories-sample-data'

describe('ReactRepos behaviour based on query responses', () => {
  it('Should show no-results row when no results are retrieved', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })} addTypename>
        <ReactRepos />
      </MockedProvider>
    )
    const loadMore = await screen.findByTestId('loading-row')
    expect(loadMore).toBeInTheDocument()
  })

  it('Should show loading row when is loading repositories', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })} addTypename>
        <ReactRepos />
      </MockedProvider>
    )
    const loadMore = await screen.findByTestId('loading-row')
    expect(loadMore).toBeInTheDocument()
  })

  it('Should NOT show loading row when all content is loaded', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })}>
        <ReactRepos />
      </MockedProvider>
    )
    const rows = await screen.findAllByTestId('table-row')
    const loadMore = screen.queryByTestId('loading-row')
    expect(rows).toHaveLength(10)
    expect(loadMore).not.toBeInTheDocument()
  })

  it('Should show no-results when repositories were not found', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: [], hasNextPage: false })}>
        <ReactRepos />
      </MockedProvider>
    )
    const noResults = await screen.findByTestId('no-results')
    expect(noResults).toBeInTheDocument()
  })

  it('Should NOT show no-results when repositories were found', () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })}>
        <ReactRepos />
      </MockedProvider>
    )
    const noResults = screen.queryByTestId('no-results')
    expect(noResults).not.toBeInTheDocument()
  })

  it('Should show total items when repositories were found', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })}>
        <ReactRepos />
      </MockedProvider>
    )
    const totalItems = await screen.findByTestId('total-items')
    expect(totalItems).toBeInTheDocument()
  })

  it('Should show empty total items when repositories were NOT found', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: [], hasNextPage: false })}>
        <ReactRepos />
      </MockedProvider>
    )
    const totalItems = await screen.findByTestId('total-items')
    expect(totalItems.textContent).toEqual('')
  })

  it('Should show Load More button when there are more results available', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: true })}>
        <ReactRepos />
      </MockedProvider>
    )
    const loadMore = await screen.findByTestId('load-more')
    expect(loadMore).toBeInTheDocument()
  })

  it('Should NOT show Load More button if there are NOT more results available', () => {
    render(
      <MockedProvider mocks={mocks({ repositories: queryRepositoriesResponse, hasNextPage: false })}>
        <ReactRepos />
      </MockedProvider>
    )
    const loadMore = screen.queryByTestId('load-more')
    expect(loadMore).not.toBeInTheDocument()
  })

  it('Should show error alert when theres an error in the query', async () => {
    render(
      <MockedProvider mocks={mocks({ repositories: [], hasNextPage: false, hasError: true })}>
        <ReactRepos />
      </MockedProvider>
    )
    const errorAlert = await screen.findByTestId('alert-error')
    expect(errorAlert).toBeInTheDocument()
  })
})
