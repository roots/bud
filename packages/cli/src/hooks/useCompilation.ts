import {useState, useEffect} from 'react'
import {Stats} from 'webpack'
import {formatWebpackMessages} from '@roots/bud-support'

const useCompilation: Hooks.Compilation.Compiler = ({
  compiler,
}) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [stats, setStats] = useState<Compilation.Stats>(null)
  const [watching] = useState<boolean>(false)
  const [errors, setErrors] = useState<Compilation.Stats.Errors>(
    null,
  )
  const [warnings, setWarnings] = useState<
    Compilation.Stats.Warnings
  >(null)
  const [running, setRunning] = useState<Compilation.Running>(
    false,
  )

  const [progress, setProgress] = useState<{
    percentage: number
    msg: string
  }>({
    percentage: 0,
    msg: '',
  })

  // Stats handler
  const statsHandler: (stats: Stats) => void = stats => {
    const allStats = stats.toJson()

    setStats(allStats)

    // Use facebook formatter for error msgs
    const formatted = formatWebpackMessages(allStats)

    setErrors(formatted.errors)
    setWarnings(formatted.warnings)
  }

  /** Progress handler */
  const progressHandler = (percentage: number, msg: string) => {
    if (typeof percentage !== 'number') return

    setProgress({
      percentage: Math.round(percentage * 100),
      msg: msg ?? progress.msg,
    })
  }

  useEffect(() => {
    if (applied) return
    setApplied(true)

    compiler.applyPlugins(progressHandler)
  }, [compiler])

  useEffect(() => {
    if (!compiler || tapped) return
    compiler.compiler.hooks.done.tap('bud-cli', statsHandler)
    setTapped(true)
  }, [compiler, tapped])

  useEffect(() => {
    if (watching) return
    setRunning(true)
    compiler.run(() => null)
  }, [compiler, watching, running])

  return {
    running,
    watching,
    progress,
    stats,
    errors,
    warnings,
  }
}

export {useCompilation as default}
