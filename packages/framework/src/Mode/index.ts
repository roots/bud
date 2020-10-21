/**
 * @constructs Framework.Mode
 */
const constructor = function (build: Framework.Build): void {
  this.build = build

  this.get = function (): Framework.Webpack.Configuration['mode'] {
    return this.build.config.get('mode')
  }

  this.set = function (
    mode: Framework.Webpack.Configuration['mode'],
  ) {
    this.build.config.set('mode', mode)
  }

  this.is = function (
    check: Framework.Webpack.Configuration['mode'],
  ) {
    return this.build.config.is('mode', check)
  }
}

export const Mode = (build: Framework.Build): Framework.Mode =>
  new constructor(build)
