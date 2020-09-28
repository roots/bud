import Bud from '..'

export default Build

declare type Build = (
  this: Bud,
) => Bud.Build.Product.Entry | Bud.Build.Product.Externals
