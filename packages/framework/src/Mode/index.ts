import type {Configuration} from 'webpack'

/**
 * @constructs Framework.Mode
 */
const constructor = function (build: Framework.Build): void {
  this.get = function (): Configuration['mode'] {
    return this.build.get('mode')
  }

  this.set = function (mode: Configuration['mode']) {
    return build.set('mode', mode)
  }

  this.is = function (check: Configuration['mode']) {
    return build.is('mode', check)
  }
}

export const Mode = (build: Framework.Build): Framework.Mode =>
  new constructor(build)
