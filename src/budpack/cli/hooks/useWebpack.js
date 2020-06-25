import {useState, useEffect, useMemo} from 'react'
import webpack from 'webpack'

const useProgress = () => {
  const [progressPlugin, setProgressPlugin] = useState()
  const [percentage, setPercentage] = useState(0)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    !progressPlugin &&
      setProgressPlugin(
        new webpack.ProgressPlugin({
          activeModules: true,
          modules: true,
          handler(percentage, message) {
            setPercentage(percentage)
            setMessage(message)
          },
        }),
      )
  }, [])

  return {progressPlugin, percentage, message}
}

/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   mode     'development' or 'build'
 */
const useWebpack = ({compiler, mode}) => {
  const {
    progressPlugin,
    percentage,
    message,
  } = useProgress()
  const [
    progressPluginApplied,
    setProgressPluginApplied,
  ] = useState(null)

  useEffect(() => {
    progressPlugin &&
      (() => {
        progressPlugin.apply(compiler)
        setProgressPluginApplied(true)
      })()
  }, [progressPlugin, compiler])

  const [buildStats, setBuildStats] = useState({})
  const [buildErrors, setBuildErrors] = useState([])
  useEffect(() => {
    const cb = (err, stats) => {
      setBuildErrors(err)
      setBuildStats(
        stats?.toJson({
          all: true,
          colors: false,
          errors: true,
        }),
      )
    }

    mode == 'development'
      ? compiler.watch({}, cb)
      : compiler.run(cb)
  }, [progressPluginApplied, mode, compiler])

  const [assets, setAssets] = useState([])
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    buildStats?.assets?.length > 1 &&
      setAssets(buildStats.assets)

    buildStats?.errors?.length > 1 &&
      setErrors(buildStats.errors)

    buildStats?.warnings?.length > 1 &&
      setWarnings(buildStats.warnings)
  }, [buildStats])

  return {
    assets,
    errors,
    warnings,
    buildStats,
    buildErrors,
    percentage,
    message,
  }
}

export default useWebpack
