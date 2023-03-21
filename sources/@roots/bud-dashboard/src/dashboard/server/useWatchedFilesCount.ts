import globby from '@roots/bud-support/globby'
import {useEffect, useState} from 'react'

const useWatchedFilesCount = (patterns: Set<string>) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    globby(Array.from(patterns)).then(files => setCount(files.length))
  }, [patterns, setCount])

  return count
}

export default useWatchedFilesCount
