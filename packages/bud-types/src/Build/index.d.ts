import Bud from '..'
import Webpack from 'webpack'

export default Build

declare type Build = (
  bud: Bud,
) => Bud.Build.Product.Entry | Bud.Build.Product.Externals
