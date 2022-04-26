import {Bud, factory} from '@repo/test-kit/bud'
import {
  disableMiddlewareHookCallback,
  enableMiddlewareHookCallback,
  method as proxy,
} from '@roots/bud-api/methods/proxy'

describe('bud.run', function () {
  let bud: Bud
  let impl: proxy

  const mockMiddlewares: any = ['dev', 'hot', 'cookie', 'proxy']

  beforeAll(async () => {
    bud = await factory()
    impl = proxy.bind(bud)
  })

  it('is a function', () => {
    expect(JSON.stringify(impl)).toEqual(
      JSON.stringify(bud.api.get('proxy')),
    )
  })

  it('disableMiddlewareHookCallback', () => {
    const res = disableMiddlewareHookCallback(mockMiddlewares)
    expect(res).toStrictEqual(['dev', 'hot'])
  })

  it('enableMiddlewareHookCallback', () => {
    const res = enableMiddlewareHookCallback(['dev', 'hot'])
    expect(res).toStrictEqual(['dev', 'hot', 'cookie', 'proxy'])
  })
})
