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
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@dependsOn`
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
    key === `svg`
      ? this.svgo.setOptions(value)
      : this.sharp.setEncodeOptions(key, value)
    return this
  }

  /**
   * Enable lossless compression
   */
  @bind
  public lossless() {
    this.sharp.setEncodeOptions(`jpeg`, {quality: 100})
    this.sharp.setEncodeOptions(`webp`, {lossless: true})
    this.sharp.setEncodeOptions(`avif`, {lossless: true})
    this.sharp.setEncodeOptions(`png`, {})
    this.sharp.setEncodeOptions(`gif`, {})
    return this
  }

  /**
   * Add a generator preset
   */
  @bind
  public addPreset<K extends keyof SharpEncodeOptions>(
    ...params: [key: K, value: Partial<Generator>]
  ) {
    this.sharp.setGenerator(...params)
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

    bud.extensions
      .get(`@roots/bud-extensions/webpack-manifest-plugin`)
      .setOption(`generate`, () => () => (_seed, files, _entrypoints) => {
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
}
