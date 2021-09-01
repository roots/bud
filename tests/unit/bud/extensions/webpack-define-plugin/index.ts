import {extensions, Framework} from '@roots/bud'
import {Env} from '@roots/bud/src/Bud/services/Env/index'
import {Container} from '@roots/container'

describe('WebpackDefinePlugin', function () {
  it('is named `webpack-define-plugin`', () => {
    expect(extensions['webpack-define-plugin'].name).toBe(
      'webpack-define-plugin',
    )
  })

  it('processes options', () => {
    const env = new Env(null as Framework)

    env.setStore({
      APP_PUBLIC_FOO: 'bar',
    })

    const store = new Container({
      extension: {
        webpackDefinePlugin: {
          BANG: 'bong',
        },
      },
    })

    expect(
      extensions['webpack-define-plugin'].options({
        env,
        store,
      }),
    ).toEqual({
      APP_PUBLIC_FOO: '"bar"',
      BANG: 'bong',
    })
  })
})
