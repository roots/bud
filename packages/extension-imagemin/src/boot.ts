import type {Imagemin} from './imagemin/typings'
import * as Plugin from './imagemin'

export const boot: Imagemin.Boot = bud => {
  bud.use([['image-minimizer-webpack-plugin', Plugin]])
  ;(bud as any).imagemin()
}
