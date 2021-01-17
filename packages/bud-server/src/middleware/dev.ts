import {
  express,
  isUndefined,
  Webpack,
  webpackDevMiddleware,
} from '@roots/bud-support'
import Server from '../Server'

export interface DevFactoryOptions {
  compiler: Webpack.Compiler
  config: Server['config']
}

/**
 * Make dev middleware
 */
const dev = ({
  compiler,
  config,
}: DevFactoryOptions): express.RequestHandler =>
  webpackDevMiddleware(compiler, options(config))

/**
 * Make dev middlware options
 */
const options = (
  config: Server['config'],
): webpackDevMiddleware.Options =>
  Object.fromEntries(
    config
      .mutate('headers', headers => ({
        ...headers,
        ['X-Server']: '@roots/bud',
      }))
      .getEntries()
      .filter(([key, option]) => !isUndefined(option)),
  )

export {dev}
