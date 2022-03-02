import {Bud, factory} from '@repo/test-kit/bud'
import {URL} from 'url'

describe('bud.serve', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      features: {log: false},
      mode: 'development',
    })
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

  it('sets URL from port number', async () => {
    const port = 3000
    await bud.api.call('serve', port)

    expect(bud.hooks.filter('dev.url').origin).toStrictEqual(
      `http://localhost:${port}`,
    )
  })

  it('sets URL from url prop', async () => {
    const url = new URL('http://test-url.com')
    await bud.api.call('serve', {url})

    expect(bud.hooks.filter('dev.url')).toStrictEqual(url)
  })

  it('enables ssl with prop', async () => {
    await bud.api.call('serve', {ssl: true})
    expect(bud.hooks.filter('dev.ssl.enabled')).toStrictEqual(true)
  })

  it('registers cert with prop', async () => {
    await bud.api.call('serve', {cert: 'foo'})
    expect(bud.hooks.filter('dev.ssl.cert')).toStrictEqual('foo')
  })

  it('registers key with prop', async () => {
    await bud.api.call('serve', {key: 'foo'})
    expect(bud.hooks.filter('dev.ssl.key')).toStrictEqual('foo')
  })

  it('registers key with prop', async () => {
    const props = {
      watch: {
        files: ['foo', 'bar'],
      },
    }
    await bud.api.call('serve', props)
    expect(bud.hooks.filter('dev.watch.files')).toStrictEqual(
      new Set(props.watch.files),
    )
  })
})
