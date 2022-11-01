import {Extension} from '@roots/bud-framework/extension'
import {beforeEach, describe, expect, it, test, vi} from 'vitest'
import webpack from 'webpack'

import hmrExtension from './index'

describe(`webpack-hot-module-replacement-plugin`, () => {
  it(`is an instance of Extension`, () => {
    expect(hmrExtension).toBeInstanceOf(Function)
  })

  it(`is an instance of Extension`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(({factory}) =>
      factory({mode: `development`}),
    )
    const extension = new hmrExtension(bud)
    expect(extension).toBeInstanceOf(Extension)
  })

  it(`is not enabled in production`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(({factory}) =>
      factory({mode: `production`}),
    )
    // @ts-ignore
    const extension = new hmrExtension(bud)
    expect(await extension.isEnabled()).toBe(false)
  })
  it(`is enabled in development`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(({factory}) =>
      factory({mode: `development`}),
    )

    // @ts-ignore
    const extension = new hmrExtension(bud)
    expect(await extension.isEnabled()).toBe(true)
  })

  it(`produces webpack hmr plugin`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(({factory}) =>
      factory({mode: `development`}),
    )

    // @ts-ignore
    const extension = new hmrExtension(bud)
    // @ts-ignore
    expect(new extension.plugin()).toBeInstanceOf(
      webpack.HotModuleReplacementPlugin,
    )
  })

  test.todo(`should be tested`)
})
