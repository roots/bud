import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import ImageMinimizerPlugin, {
  Generator,
} from 'image-minimizer-webpack-plugin'

@label('@roots/bud-imagemin')
@expose('imagemin')
export default class BudImagemin extends Extension {
  public _implementation = ImageMinimizerPlugin.squooshMinify
  public get implementation() {
    return this._implementation
  }
  public set implementation(
    implementation: typeof ImageMinimizerPlugin.squooshMinify,
  ) {
    this._implementation = implementation
  }
  @bind
  public getImplementation(): typeof ImageMinimizerPlugin.squooshMinify {
    return this.implementation
  }
  @bind
  public setImplementation(implementation): BudImagemin {
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
  public setGeneratorImplementation(generatorImplementation): BudImagemin {
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
  public setEncodeOptions(options): BudImagemin {
    this.encodeOptions = options
    return this
  }
  @bind
  public encode(key: string, value: any): BudImagemin {
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
  public setGenerator(generator): BudImagemin {
    this.generator = generator
    return this
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
