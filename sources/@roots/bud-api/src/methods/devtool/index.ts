import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-support/webpack'

export type Parameters = [Configuration['devtool']?]

export interface devtool {
  (...devtool: Parameters): Promise<Bud>
}

export interface facade {
  (...devtool: Parameters): Bud
}

export const devtool: devtool = async function (
  this: Bud,
  input = `cheap-module-source-map`,
) {
  this.hooks.on(`build.devtool`, input)
  this.api.logger.success(`bud.devtool: devtool set to`, input)
  return this
}
