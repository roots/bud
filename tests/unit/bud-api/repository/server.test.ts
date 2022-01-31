import {Bud, factory} from '@repo/test-kit/bud'
import {URL} from 'url'

describe('bud.serve', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      features: {
        dashboard: false,
        log: false,
      },
      mode: 'development',
    })
  })

  it('sets host', async () => {
    bud.serve('http://example.com')
    await bud.api.processQueue()

    expect(bud.hooks.get('dev.url').pop()()).toStrictEqual(
      new URL('http://example.com'),
    )
  })

  test.todo('set host from URL')

  test.todo('sets host from port #')

  test.todo('sets dev options obj')
})
