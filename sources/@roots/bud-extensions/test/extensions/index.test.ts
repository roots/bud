import {describe, expect, it} from 'vitest'

import * as Extensions from '../../src/extensions/index.js'

describe(`@roots/bud-extensions`, () => {
  it(`exports extensions`, async () => {
    expect(Extensions.BudCDN).toBeInstanceOf(Function)
    expect(Extensions.BudESM).toBeInstanceOf(Function)
    expect(Extensions.BudFixStyleOnlyEntrypoints).toBeInstanceOf(Function)
    expect(Extensions.CleanWebpackPlugin).toBeInstanceOf(Function)
    expect(Extensions.CopyWebpackPlugin).toBeInstanceOf(Function)
    expect(Extensions.HtmlWebpackPlugin).toBeInstanceOf(Function)
    expect(Extensions.InterpolateHtmlPlugin).toBeInstanceOf(Function)
    expect(Extensions.MiniCssExtractPlugin).toBeInstanceOf(Function)
    expect(Extensions.WebpackDefinePlugin).toBeInstanceOf(Function)
    expect(Extensions.WebpackHotModuleReplacementPlugin).toBeInstanceOf(
      Function,
    )
    expect(Extensions.WebpackManifestPlugin).toBeInstanceOf(Function)
    expect(Extensions.WebpackProvidePlugin).toBeInstanceOf(Function)
  })
})
