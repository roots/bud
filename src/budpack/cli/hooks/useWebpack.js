import {useState, useEffect} from 'react'
import webpack from 'webpack'
import formatWebpackMessages from './../util/formatWebpackMessages'

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
  const [webpackRunning, setWebpackRunning] = useState(null)
  useEffect(() => {
    const cb = (err, stats) => {
      setBuildErrors(err)
      setBuildStats(stats.toJson())
    }

    if (progressPluginApplied) {
      if (!webpackRunning) {
        setWebpackRunning(true)

        progressPluginApplied && mode == 'development'
          ? compiler.watch({}, cb)
          : compiler.run(cb)
      }
    }
  }, [progressPluginApplied, mode, compiler])

  const [assets, setAssets] = useState([])
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setAssets(buildStats?.assets)
    setWarnings(buildStats?.warnings)
    setErrors(buildStats?.errors)
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
