import Webpack from 'webpack'
import Bud from '..'

export default Build

declare type Build = (
  this: Bud.Build.Input,
) => Webpack.Configuration
