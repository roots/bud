type Compile = () => void

const compile: Compile = function () {
  this.hooks
    .filter('api.compile', this.compiler(this, this.config.build))
    .buildConfig()
    .compile()
}

export {compile}
export type {Compile}
