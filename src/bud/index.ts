import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {state} from './state'
import {compiler} from './compiler'

/**
 * Bud framework
 */
const framework = function () {
  /**
   * The state container
   */
  this.state = state(this)

  /**
   * State accessors
   */
  this.flags = this.state.flags
  this.options = this.state.options
  this.configs = this.state.configs
  this.plugins = this.state.plugins
  this.features = this.state.features
  this.paths = this.state.paths
  this.mode = this.state.flags.get('mode')
  this.inDevelopment = this.state.flags.is('mode', 'development')
  this.inProduction = this.state.flags.is('mode', 'production')

  this.util = util
  this.compiler = compiler
}

framework.prototype.hooks = hooks()

Object.values(api).forEach((method: any) => {
  framework.prototype[method.name] = method
})

export {framework}
