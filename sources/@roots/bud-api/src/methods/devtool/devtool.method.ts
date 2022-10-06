import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface devtool {
  (devtool?: Configuration['devtool']): Promise<Bud>
}

export interface facade {
  (devtool?: Configuration['devtool']): Bud
}

export const devtool: devtool = async function (
  input = `cheap-module-source-map`,
) {
  const app = this as Bud

  app.hooks.on(`build.devtool`, input)

  app.api.logger.success(`bud.devtool: devtool set`)

  return this
}
