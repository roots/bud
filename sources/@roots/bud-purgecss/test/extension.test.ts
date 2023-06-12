import '../src/index.js'

import {Bud, factory} from '@repo/test-kit'
import postcss from '@roots/bud-postcss'
import {beforeEach, describe, expect, it} from 'vitest'

import {purgecss} from '../src/api.js'
import BudPurgeCSS from '../src/extension.js'

describe(
  `@roots/bud-purgecss`,
  () => {
    let bud: Bud
    let Extension: BudPurgeCSS

    beforeEach(async () => {
      bud = await factory()
      await bud.build.make()
      await bud.extensions.add(postcss)
      // @ts-ignore
      Extension = new BudPurgeCSS(bud)
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
      expect(bud.postcss.getPluginOptions(`purgecss`)).toStrictEqual({
        content: [`**/*.html`],
      })
    })
  },
  {retry: 2},
)
