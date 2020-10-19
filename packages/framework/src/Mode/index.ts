import type {Configuration} from 'webpack'

/**
 * @constructs Framework.Mode
 */
const constructor = function (build: Framework.Build): void {
  this.build = build

  this.get = function (): Configuration['mode'] {
    return this.build.config.mode
  }

  this.set = function (mode: Configuration['mode']) {
    this.build.config.mode = mode
  }

  this.is = function (check: Configuration['mode']) {
    return this.build.mode === check
  }
}

export const Mode = (build: Framework.Build): Framework.Mode =>
  new constructor(build)
