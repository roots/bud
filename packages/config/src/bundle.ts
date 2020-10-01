import Bud from '@roots/bud-types'
import Webpack from 'webpack'

export const bundle: Bud.Config.Bundle = function (
  this: Bud,
  name: string,
  assets: string | string[] | Webpack.Entry | Webpack.EntryFunc,
): Bud {
  this.store['webpack'].merge('entry', {
    [name]: assets,
  })

  return this
}
