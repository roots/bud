/* eslint-disable n/callback-return */
import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {method as splitChunks} from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.splitChunks`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    bud.isDevelopment = true

    subject = splitChunks.bind(bud)
    vi.clearAllMocks()
  })

  it(`should call bud.hooks.on with false when called with false`, () => {
    subject(false)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      false,
    )
  })

  it(`should call bud.hooks.on with default chunk group when called with no options`, () => {
    subject()

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      {
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
      },
    )
  })

  it(`should call bud.hooks.on with default chunk group when called with true`, () => {
    subject(true)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      {
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
      },
    )
  })

  it(`should call bud.hooks.on with custom chunk`, () => {
    subject({
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

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      {
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
      },
    )
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
