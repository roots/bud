import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import type {
  SharpEncodeOptions,
  SvgoEncodeOptions,
} from 'image-minimizer-webpack-plugin/types/utils.js'

import type {Generator} from '../index.js'
import type BudImageminSharp from '../sharp/index.js'
import type BudImageminSvgo from '../svgo/index.js'

/**
 * `@roots/bud-imagemin`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 */
@label(`@roots/bud-imagemin`)
@expose(`imagemin`)
@dependsOn([`@roots/bud-imagemin/sharp`, `@roots/bud-imagemin/svgo`])
export class BudImageminExtension extends Extension {
  /**
   * Binary settings
   *
   * {@link BudImageminSharp}
   */
  public declare sharp: BudImageminSharp

  /**
   * SVG settings
   *
   * {@link BudImageminSvgo}
   */
  public declare svgo: BudImageminSvgo

  /**
   * Set encoder options
   */
  @bind
  public encode<K extends keyof SharpEncodeOptions>(
    ...params:
      | [key: K, value: SharpEncodeOptions[K]]
      | [key: `svg`, value: SvgoEncodeOptions]
  ) {
    const [key, value] = params
    const target = key === `svg` ? this.svgo : this.sharp

    target.setEncodeOptions({[key]: value})
    return this
  }

  /**
   * Enable lossless compression
   */
  @bind
  public lossless() {
    this.sharp.setEncodeOptions({
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 100,
      },

      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
      },

      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },

      // png by default sets the quality to 100%, which is same as lossless
      // https://sharp.pixelplumbing.com/api-output#png
      png: {},

      // gif does not support lossless compression at all
      // https://sharp.pixelplumbing.com/api-output#gif
      gif: {},
    })
    return this
  }

  /**
   * Add a generator preset
   */
  @bind
  public addPreset<K extends keyof SharpEncodeOptions>(
    ...params: [key: K, value: Partial<Generator>]
  ) {
    const [key, value] = params
    this.sharp.setGenerator(key, value)
    return this
  }

  /**
   * {@link Extension.init}
   *
   * @decorator `@bind`
   */
  @bind
  public override async init(bud: Bud): Promise<void> {
    this.sharp = bud.extensions.get(`@roots/bud-imagemin/sharp`)
    this.svgo = bud.extensions.get(`@roots/bud-imagemin/svgo`)
  }
}
