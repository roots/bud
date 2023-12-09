/**
 * Just a normal Webpack plugin
 */
export class WebpackPlugin {
  constructor(log) {
    this.log = log
  }

  apply(compiler) {
    if (!this.log) return

    this.log({
      message: this.constructor.name,
      suffix: 'applied!',
    })
  }
}
