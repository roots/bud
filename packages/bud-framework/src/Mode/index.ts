/**
 * @constructs Framework.Mode
 */
export const Mode = function ({
  bud,
}: Framework.Index<Framework.Bud>): void {
  this.bud = bud
  this.mode = bud.build.config.get('mode')

  this.get = function (): Framework.Webpack.Configuration['mode'] {
    return this.mode
  }

  this.set = function (
    mode: Framework.Webpack.Configuration['mode'],
  ): Framework.Bud {
    this.bud.build.config.set('mode', mode)
    return this.bud
  }

  this.is = function (
    check: Framework.Webpack.Configuration['mode'],
  ) {
    return this.mode === check
  }
}
