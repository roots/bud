import {alias} from '@roots/bud-api/src/Repository/alias'

describe('webpack.resolve.alias', function () {
  it('is a function', () => {
    expect(alias).toBeInstanceOf(Function)
  })

  test.todo('build/alias hook')
})
