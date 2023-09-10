import {Bud, factory} from '@repo/test-kit'
import postcss from '@roots/bud-postcss'
import BudPurgeCSS from '@roots/bud-purgecss'
import {purgecss} from '@roots/bud-purgecss/facade'
import {beforeEach, describe, expect, it} from 'vitest'

describe(
  `@roots/bud-purgecss`,
  () => {
    let bud: Bud
    let Extension: BudPurgeCSS

    beforeEach(async () => {
      bud = await factory()
      await bud.build.make()
      await bud.extensions.add(postcss)
      Extension = new BudPurgeCSS(bud)
    })

    it(`should be constructable`, () => {
      expect(Extension).toEqual(
        expect.objectContaining({
          dependsOn: expect.any(Set),
          label: `@roots/bud-purgecss`,
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
      expect(bud.postcss.getPluginOptions(`purgecss`)).toStrictEqual({
        content: [`**/*.html`],
      })
    })
  },
  {retry: 2},
)
