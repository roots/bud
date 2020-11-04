import {useState, useEffect} from 'react'
import {useProgress} from './useProgress'
import {useStats} from './useStats'

const useCompilation: Hooks.Compilation.Compiler = ({
  compiler,
}) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)

  const [stats, statsHandler] = useStats()
  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (!compiler || applied) return

    setApplied(true)
    compiler.applyPlugins(progressHandler)
  }, [compiler])

  useEffect(() => {
    if (!compiler || tapped) return

    compiler.run(statsHandler)
    setTapped(true)
  }, [compiler])

  return {
    progress,
    stats,
  }
}

export {useCompilation as default}
