import { DebouncedFunc } from 'lodash'
import debounce from 'lodash/debounce'
import React from 'react'

export const DEFAULT_DEBOUNCE_TIME = 500

function useDebounce<EventHandlerType extends (...args: any) => any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  eventHandler: EventHandlerType,
  debounceDelay = DEFAULT_DEBOUNCE_TIME
): DebouncedFunc<EventHandlerType> {
  const debouncedHandler = React.useMemo(() => debounce(eventHandler, debounceDelay), [eventHandler, debounceDelay])

  React.useEffect(
    () => () => {
      debouncedHandler?.cancel()
    },
    [debouncedHandler]
  )

  return debouncedHandler
}

export default useDebounce
