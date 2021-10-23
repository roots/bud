import type {Framework, Server} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type {Compiler, MultiCompiler} from 'webpack'

export interface DevProps {
  this: Framework
  compiler: Compiler | MultiCompiler
  config: Container<Server.Configuration>
}

export {Server}

export {Container}
