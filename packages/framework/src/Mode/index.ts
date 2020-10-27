/**
 * @constructs Framework.Mode
 */
export const Mode = function (
  params: Framework.Index<Framework.Bud>,
): void {
  this.build = params.bud.build

  this.get = function (): Framework.Webpack.Configuration['mode'] {
    return this.build.config.get('mode')
  }

  this.set = function (
    mode: Framework.Webpack.Configuration['mode'],
  ): Framework.Bud {
    this.build.config.set('mode', mode)

    return this.build.bud
  }

  this.is = function (
    check: Framework.Webpack.Configuration['mode'],
  ) {
    return this.build.config.is('mode', check)
  }
}
