const {useState, useEffect} = require('react')
const {ProgressPlugin} = require('webpack')

/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
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
const useWebpack = ({compiler, config}) => {
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
      setBuildStats(
        stats.toJson({
          version: true,
          hash: true,
          time: true,
          assets: true,
          errors: true,
          warnings: true,
        }),
      )
    }

    if (progressPluginApplied) {
      if (!webpackRunning) {
        setWebpackRunning(true)

        config?.mode == 'development' &&
        !config?.features?.debug == true
          ? compiler.watch({}, webpackCallback)
          : compiler.run(webpackCallback)
      }
    }
  }, [progressPluginApplied, config?.mode, compiler])

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
    hash: buildStats?.hash,
    time: buildStats?.time,
    warnings,
    percentage,
    message,
  }
}

module.exports = {useWebpack}
