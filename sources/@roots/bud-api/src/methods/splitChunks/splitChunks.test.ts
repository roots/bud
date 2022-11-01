/* eslint-disable n/callback-return */
import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {method as splitChunks} from './index'

describe(`bud.splitChunks`, () => {
  let bud
  let subject

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory({mode: `development`})
    subject = splitChunks.bind(bud)
  })

  it(`should call bud.hooks.on with false when called with false`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    subject(false)

    expect(onSpy).toHaveBeenCalledWith(
      `build.optimization.splitChunks`,
      false,
    )
  })

  it(`should call bud.hooks.on with default chunk group when called with no options`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject()

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

  it(`should call bud.hooks.on with default chunk group when called with true`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    subject(true)

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

  it(`should call bud.hooks.on with custom chunk`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

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

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
