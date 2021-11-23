import {Bud, factory} from '@roots/bud'

describe.skip('bud.serve', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {mode: 'development'},
    })
  })

  it('sets host', () => {
    bud.serve({host: 'bar.com'})
    expect(bud.store.get('server.host')).toEqual('bar.com')
  })

  it('sets proxy', () => {
    bud.serve({
      proxy: {
        target: {
          host: 'bar.com',
          port: 9000,
        },
      },
    })

    expect(bud.store.get('server.proxy.target')).toEqual({
      host: 'bar.com',
      port: 9000,
    })
  })
})
