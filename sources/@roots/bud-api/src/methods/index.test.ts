import {describe, expect, it} from 'vitest'

import {
  alias,
  assets,
  bundle,
  config,
  copy,
  define,
  devtool,
  entry,
  experiments,
  externals,
  hash,
  minimize,
  override,
  persist,
  provide,
  proxy,
  runtime,
  serve,
  splitChunks,
  template,
  use,
  version,
  watch,
  webpackConfig,
} from './index.js'

describe(`methods`, () => {
  it(`should export alias fn`, async () => {
    expect(alias).toBeInstanceOf(Function)
  })
  it(`should export assets fn`, async () => {
    expect(assets).toBeInstanceOf(Function)
  })
  it(`should export bundle fn`, async () => {
    expect(bundle).toBeInstanceOf(Function)
  })
  it(`should export config fn`, async () => {
    expect(config).toBeInstanceOf(Function)
  })
  it(`should export copy fn`, async () => {
    expect(copy).toBeInstanceOf(Function)
  })
  it(`should export define fn`, async () => {
    expect(define).toBeInstanceOf(Function)
  })

  it(`should export devtool fn`, async () => {
    expect(devtool).toBeInstanceOf(Function)
  })
  it(`should export entry fn`, async () => {
    expect(entry).toBeInstanceOf(Function)
  })
  it(`should export experiments fn`, async () => {
    expect(experiments).toBeInstanceOf(Function)
  })
  it(`should export externals fn`, async () => {
    expect(externals).toBeInstanceOf(Function)
  })
  it(`should export hash fn`, async () => {
    expect(hash).toBeInstanceOf(Function)
  })

  it(`should export minimize fn`, async () => {
    expect(minimize).toBeInstanceOf(Function)
  })
  it(`should export persist fn`, async () => {
    expect(persist).toBeInstanceOf(Function)
  })
  it(`should export provide fn`, async () => {
    expect(provide).toBeInstanceOf(Function)
  })

  it(`should export proxy fn`, async () => {
    expect(proxy).toBeInstanceOf(Function)
  })
  it(`should export runtime fn`, async () => {
    expect(runtime).toBeInstanceOf(Function)
  })
  it(`should export serve fn`, async () => {
    expect(serve).toBeInstanceOf(Function)
  })
  it(`should export splitChunks fn`, async () => {
    expect(splitChunks).toBeInstanceOf(Function)
  })
  it(`should export template fn`, async () => {
    expect(template).toBeInstanceOf(Function)
  })
  it(`should export use fn`, async () => {
    expect(use).toBeInstanceOf(Function)
  })
  it(`should export version fn`, async () => {
    expect(version).toBeInstanceOf(Function)
  })
  it(`should export watch fn`, async () => {
    expect(watch).toBeInstanceOf(Function)
  })
  it(`should export webpackConfig fn`, async () => {
    expect(webpackConfig).toBeInstanceOf(Function)
  })
  it(`should export override fn`, async () => {
    expect(override).toBeInstanceOf(Function)
  })
})
