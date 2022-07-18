import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.alias', function () {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it('should be a function', () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it('should set an alias from an object', async () => {
    await bud.api.call('alias', {'@foo': bud.path('@src/foo')})

    const alias = await bud.hooks.filterAsync('build.resolve.alias')
    expect(alias).toEqual({
      '@dist': bud.path('@dist'),
      '@src': bud.path('@src'),
      '@foo': bud.path('@src/foo'),
    })
  })

  it('should set an alias from two string parameters', async () => {
    await bud.api.call('alias', '@foo', bud.path('@src/foo'))

    const alias = await bud.hooks.filterAsync('build.resolve.alias')

    expect(alias).toEqual({
      '@dist': bud.path('@dist'),
      '@src': bud.path('@src'),
      '@foo': bud.path('@src/foo'),
    })
  })
})
