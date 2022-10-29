import {Bud, factory} from '@repo/test-kit/bud'

import Sage from './index'

describe(`@roots/sage`, () => {
  let bud: Bud
  let instance: Sage

  beforeEach(async () => {
    bud = await factory()
    await bud.extensions.add(Sage)
    instance = new Sage(bud)
  })

  it(`is registrable`, () => {
    expect(instance.app.extensions.has(`@roots/sage`)).toBeTruthy()
  })

  it(`has label prop`, () => expect(instance.label).toBe(`@roots/sage`))

  it(`registers prop: label`, () => {
    expect(instance.label).toBe(`@roots/sage`)
  })

  it(`has boot prop`, () =>
    expect(instance.register).toBeInstanceOf(Function))

  it(`registers prop: boot`, () =>
    expect(JSON.stringify(bud.extensions.get(`@roots/sage`).boot)).toBe(
      JSON.stringify(instance.boot),
    ))

  it(`registers @roots/bud-preset-wordpress`, async () => {
    expect(
      instance.app.extensions.has(`@roots/bud-preset-wordpress`),
    ).toBeTruthy()
  })

  it(`sets aliases`, async () => {
    const aliases = await bud.hooks.filterAsync(`build.resolve.alias`)

    expect(aliases).toStrictEqual({
      '@src': bud.path(`@src`),
      '@scripts': bud.path(`@src/scripts`),
      '@styles': bud.path(`@src/styles`),
      '@images': bud.path(`@src/images`),
      '@fonts': bud.path(`@src/fonts`),
      '@dist': bud.path(`@dist`),
    })
  })

  it(`sets runtime`, () => {
    expect(
      instance.app.hooks.filter(`build.optimization.runtimeChunk`),
    ).toBe(`single`)
  })
})
