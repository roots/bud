import type {Framework, Server} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type {
  Compiler,
  MultiCompiler,
} from 'webpack-dev-middleware/node_modules/webpack/types'

export {Server}

export {Container}

export interface DevProps {
  this: Framework
  compiler: Compiler | MultiCompiler
  config: Container<Server.Configuration>
}
