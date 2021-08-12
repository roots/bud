import {extensions} from '@roots/bud'

import {Framework, setupBud, teardownBud} from '../../../../util'

const WebpackDefinePlugin = extensions['webpack-define-plugin']

describe('WebpackDefinePlugin', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    bud = teardownBud(bud)
  })

  it('is named `webpack-define-plugin`', () => {
    expect(WebpackDefinePlugin.name).toBe(
      'webpack-define-plugin',
    )
  })

  it('processes options', () => {
    const env = bud.container({
      APP_PUBLIC_FOO: 'bar',
    })

    const store = bud.container({
      extension: {
        webpackDefinePlugin: {
          BANG: 'bong',
        },
      },
    })

    expect(
      (WebpackDefinePlugin.options as CallableFunction)({
        env,
        store,
      }),
    ).toEqual({
      APP_PUBLIC_FOO: '"bar"',
      BANG: 'bong',
    })
  })
})
