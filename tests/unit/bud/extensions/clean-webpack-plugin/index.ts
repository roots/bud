import {extensions} from '@roots/bud/src/Bud/extensions'

describe('CleanWebpackPlugin', function () {
  it('is named `clean-webpack-plugin`', () => {
    expect(extensions['clean-webpack-plugin'].name).toBe(
      'clean-webpack-plugin',
    )
  })
})
