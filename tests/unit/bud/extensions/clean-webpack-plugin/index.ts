import {Bud, factory} from '@roots/bud'
import * as cleanWebpackPlugin from '@roots/bud/src/Bud/extensions/clean-webpack-plugin'

describe('CleanWebpackPlugin', function () {
  let bud: Bud

  beforeAll(() => {
    bud = factory()
  })

  it('is named `clean-webpack-plugin`', () => {
    expect(cleanWebpackPlugin.name).toBe('clean-webpack-plugin')
  })

  it('has a function named make', () => {
    expect(cleanWebpackPlugin.make).toBeInstanceOf(Function)
  })

  it('has a function named when', () => {
    expect(cleanWebpackPlugin.when).toBeInstanceOf(Function)
  })

  /**
   * The when function accepts bud as its first parameter
   */
  it('accepts bud as its first parameter', () => {
    expect(() => cleanWebpackPlugin.when(bud)).not.toThrow()
  })
})
