import type {Bud} from '@roots/bud-framework'

import {factory} from '@repo/test-kit'
import EntrypointsWebpackPlugin from '@roots/entrypoints-webpack-plugin'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import BudEntrypoints from '../src/extension/index.js'
import DefaultExport from '../src/index.js'

describe(`@roots/bud-entrypoints`, () => {
  let bud: Bud
  let entrypoints: BudEntrypoints

  beforeEach(async () => {
    bud = await factory()
    entrypoints = new BudEntrypoints(bud)
  })

  it(`should be instantiable`, () => {
    expect(entrypoints).toBeInstanceOf(BudEntrypoints)
  })

  it(`should have a default export`, () => {
    expect(DefaultExport).toBe(BudEntrypoints)
  })

  it(`should have a plugin property`, () => {
    expect(entrypoints.plugin).toBe(EntrypointsWebpackPlugin)
  })

  it(`should have expected default options`, () => {
    expect(entrypoints.options).toStrictEqual({
      emitHtml: false,
      publicPath: bud.publicPath(),
      type: `object`,
    })
  })

  it(`should use the updated publicPath value if the publicPath is updated`, async () => {
    bud.setPublicPath(`test/`)
    expect(entrypoints.options?.publicPath).toBe(`test/`)
  })
})
