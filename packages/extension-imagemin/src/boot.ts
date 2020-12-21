import type {Imagemin} from './imagemin/typings'

import * as Plugin from './imagemin'

export const boot: Imagemin.Boot = ({use}) =>
  use(['image-minimizer-webpack-plugin', Plugin]).imagemin()
