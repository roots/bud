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
    logger.log(bud.extensions.get('copy-webpack-plugin').options)
  })

  /**
   * ```ts
   * bud.assets(['assets', 'more-assets'])
   * ```
   */
  it('adds arrayed assets', async () => {
    await bud.api.call('assets', ['images'])

    // @ts-ignore
    const [pattern] = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(pattern).toEqual(
      expect.objectContaining({
        from: expect.stringContaining('images'),
        to: expect.stringContaining('dist/images/[path][name][ext]'),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      }),
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

    // @ts-ignore
    const [pattern1, pattern2] = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(pattern1).toEqual(
      expect.objectContaining({
        from: bud.path('@src/images'),
        to: bud.path('@dist/images'),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      }),
    )
    expect(pattern2).toEqual(
      expect.objectContaining({
        from: bud.path('@src/fonts/font.woff'),
        to: bud.path('@dist/fonts/font.woff'),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      }),
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

    // @ts-ignore
    const [pattern] = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(pattern).toEqual(expect.objectContaining(input))
  })
})
