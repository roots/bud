import {Bud, factory} from '@repo/test-kit/bud'
import {Bud as BudInstance} from '@roots/bud'
import {beforeEach, describe, expect, it, SpyInstance, vi} from 'vitest'

import * as source from './index.js'
import * as helpers from './helpers.js'

vi.mock(`@roots/bud-support/lodash/omit`)

describe(`bud.html`, () => {
  let bud: Bud
  let budPathSpy: SpyInstance
  let html: typeof source.html

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()
    budPathSpy = vi.spyOn(bud, `path`)
    html = source.html.bind(bud)
  })

  it.each([false, true, undefined, {}])(
    `should always return bud`,
    async value => {
      expect(await html(value)).toBeInstanceOf(BudInstance)
    },
  )

  it(`getHtmlPluginOptions returns normalized options with \`template\` when it is not included`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, {foo: `bar`})

    expect(returned).toEqual(
      expect.objectContaining({
        template: helpers.defaultHtmlPluginOptions.template,
      }),
    )
  })

  it(`getHtmlPluginOptions handles undefined`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, undefined)
    expect(returned).toBe(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions returns expected options from undefined props`, async () => {
    const returned = helpers.getHtmlPluginOptions(bud, undefined)
    expect(returned).toEqual(helpers.defaultHtmlPluginOptions)
  })

  it(`getHtmlPluginOptions handles object with replace key`, async () => {
    const omit = await import(`@roots/bud-support/lodash/omit`)

    // @ts-ignore
    helpers.getHtmlPluginOptions(bud, {
      foo: `bar`,
      // @ts-ignore
      replace: {foo: `bar`},
    })

    expect(omit.default).toHaveBeenCalledWith(
      expect.objectContaining({
        foo: `bar`,
        replace: {foo: `bar`},
      }),
      `replace`,
      `template`,
    )
  })

  it(`getHtmlPluginOptions returns absolutized path from options.template`, async () => {
    helpers.getHtmlPluginOptions(bud, {template: `foo`})
    expect(budPathSpy).toHaveBeenCalledWith(`foo`)
  })

  it.each([true, false, undefined, {}])(
    `getInterpolatePluginOptions calls bud env`,
    async value => {
      const envSpy = vi.spyOn(bud.env, `getPublicEnv`)
      helpers.getInterpolatePluginOptions(bud, value)
      expect(envSpy).toHaveBeenCalledOnce()
    },
  )

  it(`appends options.replace values to publicEnv`, async () => {
    const envSpy = vi.spyOn(bud.env, `getPublicEnv`)

    const result = helpers.getInterpolatePluginOptions(bud, {
      // @ts-ignore
      replace: {foo: `bar`},
    })

    expect(envSpy).toHaveBeenCalledOnce()
    expect(result).toEqual(
      expect.objectContaining({
        foo: `bar`,
        APP_DESCRIPTION: `test app description`,
        APP_TITLE: `bud.js test app`,
      }),
    )
  })
})
