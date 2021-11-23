import {Compiler} from 'webpack'

export class WebpackPlugin {
  public constructor(public log?: any) {}
  public apply(compiler: Compiler) {
    if (!this.log) return

    this.log({
      message: this.constructor.name,
      suffix: 'applied!',
    })
  }
}
