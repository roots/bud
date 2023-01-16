import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

import type {BudImageminSharp} from './sharp/sharp.js'
import type {BudImageminSvgo} from './svgo/svgo.js'

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
   * {@link Extension.init}
   *
   * @decorator `@bind`
   */
  @bind
  public override async init(bud: Bud): Promise<void> {
    this.sharp = bud.extensions.get(`@roots/bud-imagemin/sharp`)
    this.svgo = bud.extensions.get(`@roots/bud-imagemin/svgo`)
  }

  /**
   * Enable lossless compression
   *
   * @returns this - {@link BudImageminExtension}
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
}
