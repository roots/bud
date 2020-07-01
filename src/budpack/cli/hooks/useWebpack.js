import {useState, useEffect} from 'react'
import {ProgressPlugin} from 'webpack'

/**
 * useProgress: Webpack ProgressPlugin
 */
const useProgress = () => {
  const [progressPlugin, setProgressPlugin] = useState()
  const [percentage, setPercentage] = useState(0)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    !progressPlugin &&
      setProgressPlugin(
        new ProgressPlugin({
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
 * @prop {string}   options  project options
 */
const useWebpack = ({compiler, options}) => {
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
    if (progressPlugin) {
      progressPlugin.apply(compiler)

      setProgressPluginApplied(true)
    }
  }, [progressPlugin, compiler])

  const [buildStats, setBuildStats] = useState({})
  const [buildErrors, setBuildErrors] = useState([])
  const [webpackRunning, setWebpackRunning] = useState(null)
  useEffect(() => {
    const webpackCallback = (err, stats) => {
      setBuildErrors(err)
      setBuildStats(stats.toJson())
    }

    if (progressPluginApplied) {
      if (!webpackRunning) {
        setWebpackRunning(true)

        options?.mode == 'development' && !options?.debug == true
          ? compiler.watch({}, webpackCallback)
          : compiler.run(webpackCallback)
      }
    }
  }, [progressPluginApplied, options?.mode, compiler])

  const [assets, setAssets] = useState([])
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])
  useEffect(() => {
    setAssets(buildStats?.assets)
    setWarnings(buildStats?.warnings ?? [])
    setErrors([
      ...(buildErrors ?? []),
      ...(buildStats?.errors ?? []),
    ])
  }, [buildStats, buildErrors])

  return {
    assets,
    errors,
    warnings,
    percentage,
    message,
  }
}

export default useWebpack
