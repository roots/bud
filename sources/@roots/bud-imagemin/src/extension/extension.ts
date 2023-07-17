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
   * Set encoder options
   */
  @bind
  public encode<
    K extends `${(`svg` | keyof BudImageminSharp.EncodeOptions) & string}`,
  >(
    ...params: K extends keyof BudImageminSharp.EncodeOptions
      ? [K, BudImageminSharp.EncodeOptions[K]]
      : [`svg`, BudImageminSvgo.EncodeOptions]
  ) {
    const [key, value] = params

    if (key === `svg`) {
      this.svgo.setEncodeOptions(value)
      return this
    }

    this.sharp.encode(key, value)
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
   * Make image minimizer plugin instance
   */
  public makePluginInstance({
    generator = undefined,
    implementation,
    options,
    test,
  }) {
    return new Plugin({
      test,
      ...(generator
        ? {generator}
        : {minimizer: {implementation, options: options ?? {}}}),
    })
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    // Retrieve the sharp and svgo extensions from the Bud object
    this.sharp = bud.extensions.get(`@roots/bud-imagemin/sharp`)
    this.svgo = bud.extensions.get(`@roots/bud-imagemin/svgo`)

    // Set the 'generate' option in the manifest to a function that processes an array of files
    // and generates an object mapping filenames to file paths with additional query parameters.
    bud.manifest.setOption(
      `generate`,
      () => (_: unknown, files: Array<{name: string; path: string}>) => {
        return files.reduce((records, {name, path}) => {
          // Try to match the path with a specific pattern that looks for generated files
          const match = path.match(
            /(.*)generated\.(.*)@(\d*)x(\d*)\.(.*)\.(.*)$/,
          )

          // If the path does not match the pattern, add the name and path to the accumulator (records) object
          if (!match) return {...records, [name]: path}

          // If the match is successful, extract the width, height, and rest of the path
          const [_, _base, _asset, width, height, _hash, rest] = match
          const as = rest.split(`.`).pop()

          // Create new keys with the name and query parameters for 'as', 'width' and 'height',
          // and associate them with the file path.
          const baseQueryName = `${name}?as=${as}`
          const widthOnlyQueryName = `${name}?as=${as}&width=${width}`
          const widthAndHeightQueryName = `${name}?as=${as}&width=${width}&height=${height}`

          return {
            ...records,
            // Add the name with just the 'as' query parameter and its associated path
            [baseQueryName]: records[baseQueryName] ?? path,
            // Add the name with 'width' and 'height' query parameters and its associated path
            [widthAndHeightQueryName]: path,
            // Add the name with 'width' query parameter and its associated path
            [widthOnlyQueryName]: path,
          }
        }, {}) // Initialize the accumulator (records) as an empty object
      },
    )
  }
}
