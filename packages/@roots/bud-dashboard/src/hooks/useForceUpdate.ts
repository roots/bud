import {useState, useCallback} from 'react'

export const useForceUpdate = () => {
  const [, forceUpdate] = useState(true)

  return useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}
