import {logger} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.assets', function () {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.assets).toBeInstanceOf(Function)
  })

  it('copy-webpack-plugin exists', () => {
    expect(bud.extensions.has('copy-webpack-plugin')).toBeTruthy()
    logger.log(bud.extensions.get('copy-webpack-plugin').module.options)
  })

  /**
   * ```ts
   * bud.assets(['assets', 'more-assets'])
   * ```
   */
  it('adds arrayed assets', async () => {
    await bud.api.call('assets', ['images'])

    const patterns = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(JSON.stringify(patterns)).toEqual(
      JSON.stringify([
        {
          from: 'images/**/*',
          context: bud.path('@src'),
          noErrorOnMissing: true,
        },
      ]),
    )
  })

  /**
   * ```ts
   * bud.assets('assets', 'more-assets')
   * ```
   */
  it('adds variadic assets', async () => {
    await bud.api.call('assets', 'images', 'fonts')

    const options = bud.extensions
      .get('copy-webpack-plugin')
      .get('options')

    expect(JSON.stringify(options.patterns)).toEqual(
      JSON.stringify([
        {
          from: 'images/**/*',
          context: bud.path('@src'),
          noErrorOnMissing: true,
        },
        {
          from: 'fonts/**/*',
          context: bud.path('@src'),
          noErrorOnMissing: true,
        },
      ]),
    )
  })

  /**
   * ```ts
   * bud.assets([
   *   ['assets', 'destination/assets'],
   *   ['more-assets', 'destination/more-assets'],
   * ])
   * ```
   */
  it('adds tupled assets', async () => {
    await bud.api.call('assets', [
      [bud.path('@src/images'), bud.path('@dist/images')],
      [
        bud.path('@src/fonts/font.woff'),
        bud.path('@dist/fonts/font.woff'),
      ],
    ])

    const patterns = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(JSON.stringify(patterns)).toEqual(
      JSON.stringify([
        {
          from: bud.path('@src/images/**/*'),
          to: bud.path('@dist/images'),
          noErrorOnMissing: true,
        },
        {
          from: bud.path('@src/fonts/font.woff'),
          to: bud.path('@dist/fonts/font.woff'),
          noErrorOnMissing: true,
        },
      ]),
    )
  })

  /**
   * ```ts
   * bud.assets({
   *   from: 'assets',
   *   to: 'more-assets',
   * })
   * ```
   */
  it('adds options assets', async () => {
    const input = {
      from: bud.path('@src/images'),
      to: bud.path('@dist/images'),
    }

    await bud.api.call('assets', input)

    const patterns = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(JSON.stringify(patterns)).toEqual(JSON.stringify([input]))
  })
})
