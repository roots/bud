import {useCallback, useState} from 'react'

export const useForceUpdate = () => {
  const [, forceUpdate] = useState(true)

  return useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}
