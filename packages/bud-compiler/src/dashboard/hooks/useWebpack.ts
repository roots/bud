import {useState, useEffect} from 'react'
import compile from '@roots/bud-server'

type Results = {
  error?: string
  stats?: any
}

const useWebpack = bud => {
  const [build, setBuild] = useState<Results>(null)
  const compilerCallback = (stats: any): void => {
    setBuild({
      stats: stats?.toJson({
        version: true,
        hash: true,
        modules: false,
        moduleAssets: false,
        errors: true,
        errorStack: false,
        errorDetails: false,
        time: true,
        assets: true,
        warnings: true,
        chunks: false,
        entrypoints: false,
        assetsByChunkName: false,
        logging: false,
        children: false,
        namedChunkGroups: false,
        colors: true,
      }),
    })
  }

  const [req, setReq] = useState<any>(null)
  const expressCallback = req => {
    setReq(req)
  }

  const [percentage, setPercentage] = useState<number>(0)
  const [message, setMessage] = useState<string>(null)
  const progressCallback = (percentage: number, message: string) => {
    setPercentage(percentage)
    setMessage(message)
  }

  const [compilerInitialized, setCompilerInitialized] = useState(null)
  useEffect(() => {
    if (compilerInitialized) {
      return
    }

    if (!compilerInitialized) {
      setCompilerInitialized(true)
    }

    compile({
      bud,
      mode: bud.features.enabled('dev')
        ? 'development'
        : 'production',
      compilerCallback,
      expressCallback,
      progressCallback,
    })
  }, [])

  const [assets, setAssets] = useState([])
  const [warnings, setWarnings] = useState([])
  const [errors, setErrors] = useState([])
  const [hash, setHash] = useState(null)
  const [time, setTime] = useState(null)

  useEffect(() => {
    build?.stats?.assets && setAssets(build.stats.assets)
    build?.stats?.warnings && setWarnings(build.stats.warnings)
    build?.stats?.errors && setErrors(build.stats.errors)
    build?.stats?.hash && setHash(build.stats.hash)
    build?.stats?.time && setTime(build.stats.time)
  }, [build])

  return {
    assets,
    errors,
    hash,
    time,
    warnings,
    percentage,
    message,
    req,
  }
}

export {useWebpack}
