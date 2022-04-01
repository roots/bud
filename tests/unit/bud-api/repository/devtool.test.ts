import {Bud, factory, mockProject} from '@repo/test-kit/bud'
import {execa} from '@roots/bud-support'

describe('bud.devtool', function () {
  let bud: Bud

  beforeAll(async () => (bud = await factory()))

  it('is a function', () => {
    expect(bud.devtool).toBeInstanceOf(Function)
  })

  it('is not defined by default', async () => {
    expect(bud.hooks.filter('build.devtool')).toBeUndefined()
  })

  it('enables default when called', async () => {
    await bud.api.call('devtool')
    expect(bud.hooks.filter('build.devtool')).toBe(
      'cheap-module-source-map',
    )
  })

  it('disables devtool when called with `false`', async () => {
    await bud.api.call('devtool', false)
    expect(bud.hooks.filter('build.devtool')).toBe(false)
  })

  it('enables specified devtool when called with a string', async () => {
    await bud.api.call('devtool', 'source-map')
    expect(bud.hooks.filter('build.devtool')).toBe('source-map')
  })

  it('sets source-map option for css loaders to `true` when enabled', async () => {
    await bud.api.call('devtool', 'source-map')
    expect(bud.build.items.css.getOptions()['sourceMap']).toBe(true)
  })

  it('sets source-map option for css loaders to `false` when disabled', async () => {
    await bud.api.call('devtool', false)
    expect(bud.build.items.css.getOptions()['sourceMap']).toBe(false)
  })
})
