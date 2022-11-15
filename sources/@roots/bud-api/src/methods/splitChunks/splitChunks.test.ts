/* eslint-disable n/callback-return */
import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {splitChunks as splitChunksFn} from './index.js'

describe(`bud.splitChunks`, async () => {
  let bud
  let splitChunks: splitChunksFn

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    splitChunks = splitChunksFn.bind(bud)
  })

  it(`should call bud.hooks.on with false when called with false`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await splitChunks(false)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      false,
    )
  })

  it(`should call bud.hooks.on with default chunk group when called with no options`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await splitChunks()

    expect(onSpy).toHaveBeenCalledWith(`build.optimization.splitChunks`, {
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
      cacheGroups: {
        vendor: {
          idHint: `vendor`,
          filename: `js/bundle/vendor/[name].js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    })
  })

  it(`should call bud.hooks.on with default chunk group when called with true`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await splitChunks(true)

    expect(onSpy).toHaveBeenCalledWith(`build.optimization.splitChunks`, {
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
      cacheGroups: {
        vendor: {
          idHint: `vendor`,
          filename: `js/bundle/vendor/[name].js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    })
  })

  it(`should call bud.hooks.on with custom chunk`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await splitChunks({
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
      cacheGroups: {
        MOCK: {
          idHint: `mock`,
          filename: `js/bundle/vendor/[name].js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    })

    expect(onSpy).toHaveBeenCalledWith(`build.optimization.splitChunks`, {
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
      cacheGroups: {
        MOCK: {
          idHint: `mock`,
          filename: `js/bundle/vendor/[name].js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    })
  })

  it(`should return bud`, async () => {
    expect(await splitChunks()).toEqual(bud)
  })
})
