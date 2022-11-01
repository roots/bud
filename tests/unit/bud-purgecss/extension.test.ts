import {Bud, factory} from '@repo/test-kit/bud'
import postcss from '@roots/bud-postcss'
import purgeExtension from '@roots/bud-purgecss'
import {purgecss} from '@roots/bud-purgecss/api'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`@roots/bud-purgecss`, () => {
  let bud: Bud
  beforeEach(async () => {
    bud = await factory()
    await bud.build.make()
    await bud.extensions.add(postcss)
  })

  it(`should have a name prop`, () => {
    expect(purgeExtension.label).toBe(`@roots/bud-purgecss`)
  })
  it(`should have a register method`, () => {
    expect(purgeExtension.register).toBeInstanceOf(Function)
  })

  it(`should register bud.purgecss`, async () => {
    bud = await factory()
    await bud.build.make()
    await bud.extensions.add(postcss)
    await purgeExtension.register(bud)
    expect(bud.purgecss).toBeInstanceOf(Function)
  })

  it(`should add plugin to the postcss plugins repository`, () => {
    purgecss.bind(bud)({content: [`**/*.html`]})
    expect(bud.postcss.plugins.has(`purgecss`)).toBe(true)
  })
})
