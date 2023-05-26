import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'

import type {Generator} from '../index.js'
import type * as BudImageminSharp from '../sharp/sharp.js'
import type * as BudImageminSvgo from '../svgo/svgo.js'

/**
 * Image minimizer configuration
 */
@label(`@roots/bud-imagemin`)
@expose(`imagemin`)
@dependsOn([`@roots/bud-imagemin/sharp`, `@roots/bud-imagemin/svgo`])
export class BudImageminExtension extends Extension {
  /**
   * Sharp options
   */
  public declare sharp: Bud[`imagemin`][`sharp`]

  /**
   * Svgo options
   */
  public declare svgo: Bud[`imagemin`][`svgo`]

  /**
   * Set encoder options
   */
  @bind
  public encode<
    K extends `${(keyof BudImageminSharp.EncodeOptions | `svg`) & string}`,
  >(
    ...params: K extends keyof BudImageminSharp.EncodeOptions
      ? [K, BudImageminSharp.EncodeOptions[K]]
      : [`svg`, BudImageminSvgo.EncodeOptions]
  ) {
    const [key, value] = params

    if (key === `svg`) {
      this.svgo.setEncodeOptions(value)
    } else {
      this.sharp.encode(key, value)
    }

    return this
  }

  /**
   * Enable lossless compression
   */
  @bind
  public lossless() {
    this.encode(`svg`, {})

    this.sharp.encode(`jpeg`, {quality: 100})
    this.sharp.encode(`webp`, {lossless: true})
    this.sharp.encode(`avif`, {lossless: true})
    this.sharp.encode(`png`, {})
    this.sharp.encode(`gif`, {})

    return this
  }

  /**
   * Add a generator preset
   */
  @bind
  public addPreset<K extends keyof BudImageminSharp.Options>(
    ...params: [key: K, value: Partial<Generator>]
  ) {
    this.sharp.setGenerator(...params)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.sharp = bud.extensions.get(`@roots/bud-imagemin/sharp`)
    this.svgo = bud.extensions.get(`@roots/bud-imagemin/svgo`)

    bud.manifest.setOption(`generate`, () => (_, files) => {
      return files.reduce((acc, file) => {
        const match = file.path.match(/generated\..*@(\d*)x(\d*)\.(.*)$/)

        if (match) {
          const [_, width, height, rest] = match
          const as = rest.split(`.`).pop()
          return {
            ...acc,

            /**
             * Prevent overwriting of full resolution
             *
             * Not sure that this behaves exactly as expected. But, it's
             * more predictable in practice than leaving it unhandled.
             */
            ...(!acc[`${file.name}?as=${as}`]
              ? {[`${file.name}?as=${as}`]: file.path}
              : {}),

            [`${file.name}?as=${as}&width=${width}`]: file.path,
            [`${file.name}?as=${as}&width=${width}&height=${height}`]:
              file.path,
          }
        }

        return {...acc, [file.name]: file.path}
      }, {})
    })
  }

  /**
   * Make image minimizer plugin instance
   */
  public makePluginInstance({test, implementation, options}) {
    return new Plugin({
      test,
      minimizer: {implementation, options},
    })
  }
}
