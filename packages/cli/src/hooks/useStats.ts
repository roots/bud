import {useState, useCallback} from 'react'
import {Stats} from 'webpack'

export const useStats = () => {
  const [stats, setStats] = useState(null)

  const statsHandler: (
    err: any,
    stats: Stats,
  ) => void = useCallback((err, stats) => {
    const info = stats.toJson()

    setStats(info)
  }, [])

  return [stats, statsHandler]
}

export default useStats
