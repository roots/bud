import {useCallback, useState} from 'react'

/**
 * Forces React re-renders
 *
 * @public
 */
export function useForceUpdate() {
  const [, forceUpdate] = useState(true)

  return useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}
