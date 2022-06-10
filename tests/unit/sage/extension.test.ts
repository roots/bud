import {Bud, factory} from '@repo/test-kit/bud'
import Sage from '@roots/sage'

describe('@roots/sage', () => {
  let bud: Bud
  let instance: Sage

  beforeAll(async () => {
    bud = await factory()
    await bud.extensions.add(Sage)
    instance = new Sage(bud)
  })

  it('is registrable', () => {
    expect(bud.extensions.has('@roots/sage')).toBeTruthy()
  })

  it(`has label prop`, () => expect(instance.label).toBe('@roots/sage'))

  it(`registers prop: label`, () =>
    expect(bud.extensions.get('@roots/sage').label).toBe(instance.label))

  it(`has boot prop`, () => expect(instance.boot).toBeInstanceOf(Function))

  it(`registers prop: boot`, () =>
    expect(JSON.stringify(bud.extensions.get('@roots/sage').boot)).toBe(
      JSON.stringify(instance.boot),
    ))

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

  it(`registers @roots/bud-babel`, async () => {
    expect(bud.extensions.has('@roots/bud-babel')).toBeTruthy()
  })
})
