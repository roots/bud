import * as cleanWebpackPlugin from '@roots/bud/src/Bud/services/Extensions/repository/clean-webpack-plugin'

describe('CleanWebpackPlugin', function () {
  it('is named `clean-webpack-plugin`', () => {
    expect(cleanWebpackPlugin.name).toBe('clean-webpack-plugin')
  })

  it('has a function named make', () => {
    expect(cleanWebpackPlugin.make).toBeInstanceOf(Function)
  })

  it('has a function named when', () => {
    expect(cleanWebpackPlugin.when).toBeInstanceOf(Function)
  })
})
