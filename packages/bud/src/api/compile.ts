import {Api} from '@roots/bud-types'

const compile: Api.Compile = function () {
  let compiler = this.compiler(this, this.config(this))

  compiler = this.hooks.filter('api.compile', compiler)

  compiler.compile()
}

export {compile}
