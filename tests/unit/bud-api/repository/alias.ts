import {method as alias} from '@roots/bud-api/src/api/methods/alias'

describe('webpack.resolve.alias', function () {
  it('is a function', () => {
    expect(alias).toBeInstanceOf(Function)
  })

  test.todo('build.alias hook')
})
