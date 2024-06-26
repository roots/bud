/**
 * Just a normal Webpack plugin
 */
class WebpackPlugin {
  constructor(public log: (...args: any[]) => void) {}

  apply() {
    this.log?.(this.constructor.name, 'applied!')
  }
}

export {WebpackPlugin, WebpackPlugin as default}
