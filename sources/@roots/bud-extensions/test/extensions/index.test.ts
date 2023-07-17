import {describe, expect, it} from 'vitest'

import CDN from '@roots/bud-extensions/cdn'
import ESM from '@roots/bud-extensions/esm'
import FixStyleOnlyEntrypoints from '@roots/bud-extensions/fix-style-only-entrypoints'
import Clean from '@roots/bud-extensions/clean-webpack-plugin'
import Copy from '@roots/bud-extensions/copy-webpack-plugin'
import Html from '@roots/bud-extensions/html-webpack-plugin'
import Interpolate from '@roots/bud-extensions/interpolate-html-webpack-plugin'
import MiniCssExtract from '@roots/bud-extensions/mini-css-extract-plugin'
import TSConfigValues from '@roots/bud-extensions/tsconfig-values'

import Define from '@roots/bud-extensions/webpack-define-plugin'
import HotModuleReplacement from '@roots/bud-extensions/webpack-hot-module-replacement-plugin'
import Manifest from '@roots/bud-extensions/webpack-manifest-plugin'
import Provide from '@roots/bud-extensions/webpack-provide-plugin'

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
