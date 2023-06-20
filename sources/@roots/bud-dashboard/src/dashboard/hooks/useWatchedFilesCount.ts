import globby from '@roots/bud-support/globby'
import {useEffect, useState} from '@roots/bud-support/ink'

export const useWatchedFilesCount = (patterns: Set<string>) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!patterns?.size) setCount(0)

    globby(Array.from(patterns)).then(files => setCount(files.length))
  }, [patterns, setCount])

  return count
}
