import {Bud, factory} from '@repo/test-kit/bud'
import * as Sage from '@roots/sage'

describe('@roots/sage', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(Sage)
  })

  it('is registrable', () => {
    expect(bud.extensions.has('@roots/sage')).toBeTruthy()
  })

  it(`has name prop`, () => expect(Sage.name).toBe('@roots/sage'))

  it(`registers prop: name`, () =>
    expect(bud.extensions.get('@roots/sage').get('name')).toBe(Sage.name))

  it(`has boot prop`, () => expect(Sage.boot).toBeInstanceOf(Function))

  it(`registers prop: boot`, () =>
    expect(bud.extensions.get('@roots/sage').get('boot')).toBe(Sage.boot))

  it(`sets aliases`, async () => {
    const aliases = await bud.hooks.filterAsync('build.resolve.alias')

    expect(aliases).toStrictEqual({
      '@src': bud.path('@src'),
      '@scripts': bud.path('@src/scripts'),
      '@styles': bud.path('@src/styles'),
      '@images': bud.path('@src/images'),
      '@fonts': bud.path('@src/fonts'),
      '@dist': bud.path('@dist'),
    })
  })

  it(`sets runtime`, () => {
    expect(bud.hooks.filter('build.optimization.runtimeChunk')).toBe(
      'single',
    )
  })
})
