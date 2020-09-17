import {useState, useEffect} from 'react'
import {Compiler, Configuration} from 'webpack'
import {Request, Response, NextFunction} from 'express'
import Server, {ServerConfig} from '@roots/bud-server'

interface ServerDerivedState {
  request: Request
  response: Response
  serverInstance: Server['server']
}

const useServer = (
  compiler: Compiler,
  configuration: ServerConfig,
  webpackConfiguration: Configuration,
): ServerDerivedState => {
  const [config, setConfig] = useState(configuration)
  const [webpackConfig, setWebpackConfig] = useState(
    webpackConfiguration,
  )
  const [server, setServer] = useState(null)
  const [serverInstance, setServerInstance] = useState(null)
  const [serving, setServing] = useState(false)

  const [request, setRequest] = useState(null)
  const [response, setResponse] = useState(null)

  /**
   * Set configuration.
   */
  useEffect(() => {
    configuration && setConfig(configuration)
  }, [configuration])

  useEffect(() => {
    webpackConfiguration &&
      setWebpackConfig(webpackConfiguration)
  }, [webpackConfiguration])

  /**
   * Set server.
   */
  useEffect(() => {
    if (!server || !webpackConfig) {
      return
    }

    const serverAdapter = new Server({
      compiler,
      config,
      handler,
    })

    if (config.hot || config.hotOnly) {
      webpackConfig &&
        setWebpackConfig({
          ...webpackConfig,
          entry: serverAdapter.injectHmr(webpackConfig.entry),
        })
    }

    serverAdapter.addDevMiddleware()

    if (config.hot || config.hotOnly) {
      serverAdapter.addHotMiddleware()
    }

    if (config.host || config.from?.host) {
      serverAdapter.addProxyMiddleware()
    }

    serverAdapter.listen()

    setServer(serverAdapter)
  }, [server, config, compiler])

  /**
   * Set server instance.
   */
  useEffect(() => {
    if (serverInstance || !server) {
      return
    }

    setServerInstance(server.server)
  }, [serverInstance, server])

  /**
   * Express router callback.
   */
  const handler: (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void> = async (request, response, next) => {
    setRequest(request)
    setResponse(response)

    next()
  }

  return {
    serverInstance,
    request,
    response,
  }
}

export {useServer as default, ServerDerivedState}
