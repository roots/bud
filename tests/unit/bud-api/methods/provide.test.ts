import {Bud, factory} from '@repo/test-kit/bud'
import {provide as provideMethod} from '@roots/bud-api/methods/provide'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`bud.provide`, () => {
  let bud: Bud
  let provide: provideMethod

  beforeAll(async () => {
    bud = await factory()
    provide = provideMethod.bind(bud)
  })

  it(`should be a function`, () => {
    expect(provide).toBeInstanceOf(Function)
    expect(bud.provide).toBeInstanceOf(Function)
  })

  it(`should modify webpack-provide-plugin options`, async () => {
    bud.provide({jquery: [`$`, `jQuery`]})

    await bud.api.processQueue()

    expect(
      bud.extensions.get(`@roots/bud-extensions/webpack-provide-plugin`)
        .options,
    ).toStrictEqual({
      jQuery: `jquery`,
      $: `jquery`,
    })
  })
})
