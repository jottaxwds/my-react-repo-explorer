import MuiInput from '@mui/material/Input'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import useDebounce from '../useDebounce'

type CustomChangeHandler = (value: string) => void

function WithDebounceInput({ onChange }: { onChange: CustomChangeHandler }) {
  const debouncedChangeHandler = useDebounce(onChange)
  return (
    <MuiInput
      data-testid="my-input"
      name="myinput"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (!debouncedChangeHandler) {
          return
        }
        debouncedChangeHandler(event.target.value)
      }}
    />
  )
}

describe('useDebounce hook unit test', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('Should NOT call given "onChange" right after input field changes its value', () => {
    const mockChangeHandler = jest.fn()
    render(<WithDebounceInput onChange={mockChangeHandler} />)
    const input = screen.getByTestId('my-input').querySelector('input')
    if (!input) {
      return
    }
    fireEvent.input(input, { target: { value: 'meh' } })
    expect(mockChangeHandler).not.toHaveBeenCalled()
  })

  it('Should call given "onChange" after 300ms', () => {
    const mockChangeHandler = jest.fn()
    render(<WithDebounceInput onChange={mockChangeHandler} />)
    const input = screen.getByTestId('my-input').querySelector('input')
    if (!input) {
      return
    }
    fireEvent.input(input, { target: { value: 'meh' } })
    jest.runAllTimers()
    expect(mockChangeHandler).toHaveBeenCalled()
  })
})
