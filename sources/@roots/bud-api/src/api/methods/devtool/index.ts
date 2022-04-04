import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface devtool {
  (devtool?: Configuration['devtool']): Promise<Framework>
}

export interface facade {
  (devtool?: Configuration['devtool']): Framework
}

export const devtool: devtool = async function (
  input = 'cheap-module-source-map',
) {
  const app = this as Framework

  app.hooks.on('build.devtool', () => input)

  app.log({message: `devtool set: ${input}`})

  return this
}
