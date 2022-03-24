import {Bud, factory} from '@repo/test-kit/bud'
import {URL} from 'url'

describe('bud.serve', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
  })

  beforeEach(async () => {
    await bud.api.call('serve', 'http://localhost:3000')
  })

  it('sets URL from string', async () => {
    bud.serve('http://example.com')

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.url')).toStrictEqual(
      new URL('http://example.com'),
    )
  })

  it('sets URL from URL', async () => {
    const testUrl = new URL('http://test-url.com')

    bud.serve(testUrl)

    await bud.api.processQueue()

    expect(bud.hooks.filter('dev.url')).toStrictEqual(testUrl)
  })

  it('sets options', async () => {
    const url = new URL('http://test-url.com')

    const options = {cert: 'foo', key: 'bar'}
    await bud.api.call('serve', url, options)

    expect(bud.hooks.filter('dev.options')).toStrictEqual(options)
  })
})
