import {Bud} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {isString} from 'lodash'

import * as BudImagemin from './imagemin.extension'

export interface imagemin {
  (callback: (options: Container) => typeof BudImagemin.options): Bud
}
export interface imagemin {
  (setting: 'lossless' | 'lossy'): Bud
}

const lossless = {
  encodeOptions: {
    mozjpeg: {quality: 100},
    webp: {lossless: 1},
    avif: {cqLevel: 0},
  },
}

export const imagemin: imagemin = function (
  option:
    | 'lossless'
    | 'lossy'
    | ((options: Container) => typeof BudImagemin.options),
): Bud {
  const ctx = this as Bud

  if (isString(option) && option == 'lossy') {
    ctx.extensions
      .get('@roots/bud-imagemin')
      .setOption('minimizer.options', {})
    return ctx
  }

  if (isString(option) && option == 'lossless') {
    ctx.extensions
      .get('@roots/bud-imagemin')
      .setOption('minimizer.options', lossless)
    return ctx
  }

  ctx.extensions
    .get('@roots/bud-imagemin')
    .setOption(
      'minimizer',
      option(ctx.extensions.get('@roots/bud-imagemin').options),
    )

  return ctx
}
