import {useState, useMemo, useEffect} from 'react'

/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   mode     'development' or 'build'
 */
const useWebpack = ({compiler, mode}) => {
  const [buildStats, setBuildStats] = useState({})
  const [buildErrors, setBuildErrors] = useState([])
  useMemo(() => {
    const cb = (buildErrors, buildStats) => {
      setBuildErrors(buildErrors)
      setBuildStats(buildStats.toJson({
        assets: true,
        errors: true,
        warnings: true,
        version: false,
        hash: false,
        time: false,
        filteredModules: false,
        outputPath: false,
        assetsByChunkName: false,
        chunks: false,
        modules: false,
      }))
    }

    mode == 'development' ? compiler.watch({}, cb) : compiler.run(cb)
  }, [mode, compiler])

  const [assets, setAssets] = useState([])
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    buildStats?.assets?.length > 1 && (() => {
      setAssets(buildStats.assets)
    })()

    buildStats?.errors?.length > 1 && (() => {
      setErrors(buildStats.errors)
    })()

    buildStats?.warnings?.length > 1 && (() => {
      setWarnings(buildStats.warnings)
    })()
  }, [buildStats])

  return {
    assets,
    errors,
    warnings,
    buildStats,
    buildErrors,
  }
}

export default useWebpack