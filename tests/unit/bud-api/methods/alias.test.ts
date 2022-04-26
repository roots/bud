import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.alias', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('is configurable by bud.alias', async () => {
    await bud.api.call('alias', {'@foo': 'bar'})

    const alias = await bud.hooks.filterAsync('build.resolve.alias')
    expect(alias).toEqual({
      '@dist': bud.path('@dist'),
      '@src': bud.path('@src'),
      '@foo': bud.path('./bar'),
    })
  })
})
