import './interface'

import {Bud, Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-framework/extension/decorators'
import ImageMinimizerPlugin, {
  Generator,
} from 'image-minimizer-webpack-plugin'

/**
 * @public
 */
export class Imagemin extends Extension {
  /**
   * @public
   */
  public label = '@roots/bud-imagemin'

  public _implementation = ImageMinimizerPlugin.squooshMinify
  public get implementation() {
    return this._implementation
  }
  public set implementation(implementation) {
    this._implementation = implementation
  }
  @bind
  public setImplementation(implementation): Imagemin {
    this.implementation = implementation
    return this
  }

  public _generatorImplementation = ImageMinimizerPlugin.squooshGenerate
  public get generatorImplementation() {
    return this._generatorImplementation
  }
  public set generatorImplementation(generatorImplementation) {
    this._generatorImplementation = generatorImplementation
  }
  @bind
  public setGeneratorImplementation(generatorImplementation): Imagemin {
    this.generatorImplementation = generatorImplementation
    return this
  }

  public _encodeOptions: Map<string, any> = new Map([
    ['mozjpeg', 'auto'],
    ['webp', 'auto'],
    ['avif', 'auto'],
    ['oxipng', 'auto'],
  ])
  public get encodeOptions() {
    return this._encodeOptions
  }
  public set encodeOptions(options) {
    this._encodeOptions = options
  }
  @bind
  public setEncodeOptions(options): Imagemin {
    this.encodeOptions = options
    return this
  }
  @bind
  public encode(key: string, value: any): Imagemin {
    key =
      key === 'jpeg' || key === 'jpg'
        ? 'mozjpeg'
        : key === 'png'
        ? 'oxipng'
        : key

    this.encodeOptions.set(key, value)
    return this
  }

  public _generator: Set<Generator<any>> = new Set([
    {
      preset: 'webp',
      implementation: this.generatorImplementation,
      options: {
        encodeOptions: {
          webp: this.encodeOptions.get('webp'),
        },
      },
    },
  ])
  public get generator() {
    return this._generator
  }
  public set generator(generator) {
    this._generator = generator
  }
  @bind
  public setGenerator(generator): Imagemin {
    this.generator = generator
    return this
  }

  /**
   * @public
   */
  @bind
  public async register(app: Bud) {
    app.imagemin = this
  }

  /**
   * @public
   */
  @bind
  public async boot() {
    this.app.hooks.on('build.optimization.minimizer', minimizer => [
      ...(minimizer ?? []),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: this.implementation,
          options: {
            encodeOptions: Object.fromEntries(this.encodeOptions),
          },
        },
        generator: Array.from(this.generator),
      }),
    ])
  }
}
