import type {Bud} from '@roots/bud-typings'

/**
 * @constructs Framework.Mode
 */
export const Mode = function (bud: Bud): void {
  this.bud = bud

  this.get = function (): Framework.Webpack.Configuration['mode'] {
    return this.bud.config.get('mode')
  }

  this.set = function (
    mode: Framework.Webpack.Configuration['mode'],
  ): Framework.Bud {
    this.bud.config.set('mode', mode)
    return this.bud
  }

  this.is = function (
    check: Framework.Webpack.Configuration['mode'],
  ) {
    return this.bud.config.is('mode', check)
  }
}
