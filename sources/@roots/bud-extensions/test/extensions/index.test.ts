import {describe, expect, it} from 'vitest'

import CDN from '../../src/cdn/index.js'
import ESM from '../../src/esm/index.js'
import FixStyleOnlyEntrypoints from '../../src/fix-style-only-entrypoints/index.js'
import Clean from '../../src/clean-webpack-plugin/index.js'
import Copy from '../../src/copy-webpack-plugin/index.js'
import Html from '../../src/html-webpack-plugin/index.js'
import Interpolate from '../../src/interpolate-html-webpack-plugin/index.js'
import MiniCssExtract from '../../src/mini-css-extract-plugin/index.js'
import TSConfigValues from '../../src/tsconfig-values/index.js'

import Define from '../../src/webpack-define-plugin/index.js'
import HotModuleReplacement from '../../src/webpack-hot-module-replacement-plugin/index.js'
import Manifest from '../../src/webpack-manifest-plugin/index.js'
import Provide from '../../src/webpack-provide-plugin/index.js'

describe(`@roots/bud-extensions`, () => {
  it(`exports extensions`, async () => {
    expect(CDN).toBeInstanceOf(Function)
    expect(ESM).toBeInstanceOf(Function)
    expect(FixStyleOnlyEntrypoints).toBeInstanceOf(Function)
    expect(Clean).toBeInstanceOf(Function)
    expect(Copy).toBeInstanceOf(Function)
    expect(Html).toBeInstanceOf(Function)
    expect(Interpolate).toBeInstanceOf(Function)
    expect(MiniCssExtract).toBeInstanceOf(Function)
    expect(Define).toBeInstanceOf(Function)
    expect(HotModuleReplacement).toBeInstanceOf(Function)
    expect(Manifest).toBeInstanceOf(Function)
    expect(Provide).toBeInstanceOf(Function)
    expect(TSConfigValues).toBeInstanceOf(Function)
  })
})
