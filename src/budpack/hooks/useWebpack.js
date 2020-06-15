import {useState, useMemo, useEffect} from 'react'

/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   mode     'dev' or 'build'
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
        filteredMOdules: false,
        outputPath: false,
        assetsByChunkName: false,
        chunks: false,
        modules: false,
      }))
    }

    mode == 'dev'
      ? compiler.watch({}, cb)
      : compiler.run(cb)
  }, [mode, compiler])

  const [assets, setAssets] = useState([])
  const [hasAssets, setHasAssets] = useState(false)
  const [warnings, setWarnings] = useState([])
  const [hasWarnings, setHasWarnings] = useState(false)
  const [errors, setErrors] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  useEffect(() => {
    buildStats?.assets?.length > 1 && (() => {
      setHasAssets(true)
      setAssets(buildStats.assets)
    })()

    buildStats?.errors?.length > 1 && (() => {
      setHasErrors(true)
      setErrors(buildStats.errors)
    })()

    buildStats?.warnings?.length > 1 && (() => {
      setHasWarnings(true)
      setWarnings(buildStats.warnings)
    })()
  }, [buildStats])

  return {
    assets,
    hasAssets,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
    buildErrors,
  }
}

export default useWebpack