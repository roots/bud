import {Config} from '..'
import Webpack from 'webpack'

export const bundle: Config.Bundle = function (
  name: string,
  assets: string | string[] | Webpack.Entry | Webpack.EntryFunc,
) {
  this.store['webpack'].merge('entry', {
    [name]: assets,
  })

  return this
}
