/**
 * Just a normal Webpack plugin
 */
export class WebpackPlugin {
  constructor(public log: (...args: any[]) => void) {
  }

  apply(compiler: any) {
    this.log?.(this.constructor.name, 'applied!')
  }
}
