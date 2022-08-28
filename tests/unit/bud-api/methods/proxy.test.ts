import {Bud, factory} from '@repo/test-kit/bud'
import {
  disableMiddlewareHookCallback,
  enableMiddlewareHookCallback,
  method as proxy,
} from '@roots/bud-api/methods/proxy'

describe.skip(`bud.proxy`, function () {
  let bud: Bud
  let impl: proxy

  const mockMiddlewares: any = [`dev`, `hot`, `cookie`, `proxy`]

  beforeAll(async () => {
    bud = await factory({mode: `development`})
    impl = proxy.bind(bud)
  })

  beforeEach(() => {
    bud.hooks.on(`dev.middleware.proxy.replacements`, [])
  })

  describe(`bud`, () => {
    it(`has expected proxy default`, () => {
      expect(bud.hooks.filter(`dev.middleware.enabled`)).toStrictEqual([
        `dev`,
        `hot`,
      ])
    })
  })

  it(`is a function`, () => {
    expect(JSON.stringify(impl)).toEqual(
      JSON.stringify(bud.api.get(`proxy`)),
    )
  })

  it(`returns bud`, () => {
    expect(proxy.call(bud)).toBeInstanceOf(Bud)
  })

  it(`enables middleware when called`, () => {
    proxy.call(bud)
    expect(bud.hooks.filter(`dev.middleware.enabled`)).toContain(`proxy`)
  })

  it(`disables middleware when called with false`, () => {
    proxy.call(bud, false)
    expect(bud.hooks.filter(`dev.middleware.enabled`)).toStrictEqual([
      `dev`,
      `hot`,
    ])
  })

  it(`sets proxy target when called with string`, () => {
    const data = `http://site.test/`
    proxy.call(bud, data)
    expect(
      bud.hooks.filter(`dev.middleware.proxy.target`).toString(),
    ).toEqual(data)
  })

  it(`sets proxy target when called with URL`, () => {
    const data = new URL(`http://site.test`)
    proxy.call(bud, data)
    expect(bud.hooks.filter(`dev.middleware.proxy.target`)).toStrictEqual(
      data,
    )
  })

  it(`assigns default url replacements`, () => {
    const data = new URL(`http://site.test`)
    proxy.call(bud, data)
    expect(bud.hooks.filter(`dev.middleware.proxy.replacements`)).toEqual(
      expect.arrayContaining([expect.arrayContaining([data.href, `/`])]),
    )
  })

  it(`assigns url replacements passed via callback`, () => {
    const data = `http://site.test`
    const replacement = [`http://site.test`, `http://replace.test:3030`]
    proxy.call(bud, data, replacements => [...replacements, replacement])
    expect(
      bud.hooks.filter(`dev.middleware.proxy.replacements`),
    ).toContain(replacement)
  })

  it(`assigns url replacements passed via literal array`, () => {
    const data = `http://site.test`
    const replacement = [`http://site.test`, `http://replace.test:3030`]
    proxy.call(bud, data, [replacement])
    expect(bud.hooks.filter(`dev.middleware.proxy.replacements`)).toEqual(
      expect.arrayContaining([expect.arrayContaining(replacement)]),
    )
  })

  it(`disableMiddlewareHookCallback`, () => {
    const res = disableMiddlewareHookCallback(mockMiddlewares)
    expect(res).toStrictEqual([`dev`, `hot`])
  })

  it(`enableMiddlewareHookCallback`, () => {
    const res = enableMiddlewareHookCallback([`dev`, `hot`])
    expect(res).toStrictEqual([`dev`, `hot`, `cookie`, `proxy`])
  })
})
