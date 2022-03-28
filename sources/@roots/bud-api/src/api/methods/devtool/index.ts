import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface devtool {
  (devtool?: Configuration['devtool']): Promise<Framework>
}

export interface facade {
  (devtool?: Configuration['devtool']): Framework
}

export const devtool: devtool = async function (devtool = false) {
  this as Framework

  const value = devtool ?? 'cheap-module-source-map'

  this.hooks.on('build.devtool', value)

  this.log({prefix: 'devtool', message: devtool})

  return this
}
