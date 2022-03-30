import {Bud, factory} from '@repo/test-kit/bud'

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

    expect(bud.hooks.filter('dev.ssl')).toBe(false)
    expect(bud.hooks.filter('dev.host')).toStrictEqual('example.com')
    expect(bud.hooks.filter('dev.port')).toStrictEqual([3000])
  })

  it('sets options', async () => {
    const options = {cert: 'foo', key: 'bar'}

    await bud.api.call('serve', {options})

    expect(bud.hooks.filter('dev.options')).toStrictEqual(options)
  })
})
