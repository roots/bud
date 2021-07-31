import {WebpackDefinePlugin} from '@roots/bud'

import {Framework, setupBud, teardownBud} from '../../../../util'

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

/* name: 'webpack-define-plugin',
  make: options => new DefinePlugin(options.all()),
  when: (_bud, opts) => opts.getEntries()?.length > 0,
  options: ({env, store}) => {
    const fromEnv = env
      .getEntries()
      .filter(([k]: [string, string]) =>
        k.includes('APP_PUBLIC'),
      )
      .reduce(
        (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
        {},
      )

    const fromStore = store.get('extension.webpackDefinePlugin')

    return {
      ...fromEnv,
      ...fromStore,
    }
  } 
*/
