import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {assets} from './assets.method'

describe('bud.assets', function () {
  let bud: Bud
  let instance: typeof assets

  beforeEach(async () => {
    bud = await factory()
    instance = assets.bind(bud)
  })

  describe('expectations', () => {
    it('should be a function', () => {
      expect(bud.assets).toBeInstanceOf(Function)
    })

    it('should have copy-webpack-plugin available', () => {
      expect(bud.extensions.has('copy-webpack-plugin')).toBeTruthy()
    })
  })

  it('should add job when passed an array of strings', async () => {
    await instance(['images'])

    expect(
      bud.extensions.get('copy-webpack-plugin').getOption('patterns'),
    ).toMatchSnapshot([
      {
        from: expect.stringContaining('images'),
        to: expect.stringContaining('dist/images/[path][name][ext]'),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      },
    ])
  })

  it('should add jobs when passed an array of tuples', async () => {
    await instance([
      [bud.path('@src/images'), bud.path('@dist/images')],
      [
        bud.path('@src/fonts/font.woff'),
        bud.path('@dist/fonts/font.woff'),
      ],
    ])

    const patterns = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')
      ?.slice(0, 2)

    expect(patterns).toMatchSnapshot([
      {
        from: expect.stringMatching(/tests\/util\/project\/src\/images$/),
        to: expect.stringMatching(/tests\/util\/project\/dist\/images$/),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      },
      {
        from: expect.stringMatching(
          /tests\/util\/project\/src\/fonts\/font.woff$/,
        ),
        to: expect.stringMatching(
          /tests\/util\/project\/dist\/fonts\/font.woff$/,
        ),
        context: expect.stringContaining('src'),
        toType: 'template',
        noErrorOnMissing: true,
      },
    ])
  })

  it('should add jobs when passed an object', async () => {
    const input = {
      from: bud.path('@src/images'),
      to: bud.path('@dist/images'),
    }

    await instance(input)

    const patterns = bud.extensions
      .get('copy-webpack-plugin')
      .getOption('patterns')

    expect(patterns?.pop()).toMatchSnapshot({
      from: expect.stringMatching(/tests\/util\/project\/src\/images$/),
      to: expect.stringMatching(/tests\/util\/project\/dist\/images$/),
    })
  })
})
