import {Framework} from '@roots/bud-typings'

export const publicPath: PublicPath = function (publicPath) {
  this.config.set(
    'output.publicPath',
    this.fs.path.normalize(`/${publicPath}/`),
  )

  return this
}

export type PublicPath = (
  this: Framework,
  publicPath: string,
) => Framework
