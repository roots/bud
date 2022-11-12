import {Bud, factory} from '@repo/test-kit/bud'
import postcss from '@roots/bud-postcss'
import {purgecss} from './api.js'
import {beforeEach, describe, expect, it} from 'vitest'

import * as Extension from './extension.js'

describe(`@roots/bud-purgecss`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    await bud.build.make()
    await bud.extensions.add(postcss)
  })

  it(`should be constructable`, () => {
    expect(Extension).toEqual(
      expect.objectContaining({
        label: `@roots/bud-purgecss`,
        dependsOn: expect.any(Set),
        register: expect.any(Function),
      }),
    )
  })

  it(`should register bud.purgecss`, async () => {
    await Extension.register(bud)
    expect(bud.purgecss).toBeInstanceOf(Function)
  })

  it(`should add plugin to the postcss plugins repository`, () => {
    purgecss.bind(bud)({content: [`**/*.html`]})
    expect(bud.postcss.plugins.has(`purgecss`)).toBe(true)
  })
})
