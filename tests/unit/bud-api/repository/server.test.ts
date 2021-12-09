import {Bud, factory} from '@roots/bud'
import {join} from 'path'

describe('bud.serve', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
        location: {
          project: join(process.cwd(), 'examples/sage'),
        },
      },
    })
  })

  it('sets host', async () => {
    bud.serve('http://example.com')
    await bud.api.processQueue()

    expect(bud.store.get('server.dev')).toEqual(
      'http://example.com',
    )
  })
})
