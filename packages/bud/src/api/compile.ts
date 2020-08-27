type Compile = () => void

const compile: Compile = function () {
  let compiler = this.compiler(this, this.config(this))
  compiler = this.hooks.filter('api.compile', compiler)

  compiler.compile()
}

export {compile}
export type {Compile}
