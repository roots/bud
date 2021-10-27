import {factory, Framework} from '@roots/bud'

describe('bud.serve', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      mode: 'development',
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('sets host', () => {
    bud.serve({host: 'bar.com'})
    expect(bud.server.config.get('host')).toEqual('bar.com')
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

    expect(bud.server.config.get('proxy.target')).toEqual({
      host: 'bar.com',
      port: 9000,
    })
  })
})
