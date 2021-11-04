import {Framework} from '@roots/bud'

describe.skip('webpack.resolve.alias', function () {
  let bud: Framework

  it('is a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', () => {
    bud.alias({'@foo': 'bar'}).build.make()

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})
