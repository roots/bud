import {useState, useEffect} from 'react'
import {
  Stats,
  Configuration,
  Compiler as WebpackCompiler,
} from 'webpack'

import Compiler from '@roots/bud-compiler'
import {ServerConfig} from '@roots/bud-server'

import useServer, {ServerDerivedState} from './useServer'

interface CompilerDerivedState {
  compilerInstance: WebpackCompiler
  serverInstance: ServerDerivedState['serverInstance']
  stats: Stats
  progress: {
    number: number
    message: string
  }
  error: Error
}

const useCompiler = (
  configuration: Configuration,
  serverConfiguration: ServerConfig,
): CompilerDerivedState => {
  const [config, setConfig] = useState(configuration)
  const [serverConfig, setServerConfig] = useState(
    serverConfiguration,
  )

  const [compiler, setCompiler] = useState(null)
  const [compilerInstance, setCompilerInstance] = useState(null)

  const [valid, setValid] = useState(null)
  const [watching, setWatching] = useState(false)
  const [running, setRunning] = useState(false)

  const [progress, setProgress] = useState(null)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  const {serverInstance} = useServer(
    compiler,
    serverConfiguration,
    configuration,
  )

  /**
   * Set configuration.
   */
  useEffect(() => {
    configuration && setConfig(configuration)
  }, [configuration])

  /**
   * Set compiler.
   */
  useEffect(() => {
    if (compiler && valid) {
      return
    }

    if (!config) {
      return
    }

    const compilerAdapter = new Compiler(
      '@roots/bud',
      config,
      handler,
    )

    compilerAdapter.applyProgressPlugin(progressHandler)

    setCompiler(compilerAdapter)
    setValid(true)
  }, [config])

  /**
   * Set compiler instance.
   */
  useEffect(() => {
    if (!compiler || compilerInstance) {
      return
    }

    setCompilerInstance(compiler.compiler)
  }, [compiler, compilerInstance])

  /**
   * Watch / run
   */
  useEffect(() => {
    if (
      !compiler ||
      watching ||
      running ||
      serverConfig.hot ||
      serverConfig.hotOnly
    ) {
      return
    }

    if (!watching && config.watch) {
      compiler.watch(handler)
      setWatching(true)

      return
    }

    if (!running && config.mode == 'development') {
      compiler.run(handler)
      setRunning(true)
    }
  }, [compiler, config, watching, running])

  /**
   * ProgressPlugin handler.
   */
  const progressHandler = (number: number, message: string) => {
    setProgress({number, message})
  }

  /**
   * Compiler handler.
   */
  const handler = (err: Error, stats: Stats) => {
    if (err) {
      console.error(err)
      return
    }

    if (stats.hasErrors()) {
      console.error(stats.toJson().errors)
    }

    if (stats.hasWarnings()) {
      console.warn(stats.toJson().warnings)
    }

    setStats(
      stats?.toJson({
        all: false,
        version: true,
        hash: true,
        errors: true,
        assets: true,
        warnings: true,
        modules: false,
        chunks: false,
        entrypoints: false,
        children: false,
      }),
    )
  }

  return {
    compilerInstance,
    serverInstance,
    progress,
    stats,
    error,
  }
}

export {useCompiler as default, CompilerDerivedState}
