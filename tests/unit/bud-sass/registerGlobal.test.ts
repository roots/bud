import {Bud, factory} from '@repo/test-kit/bud'
import BudSass from '@roots/bud-sass'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`@roots/bud-sass registration`, () => {
  let bud: Bud

  describe(`bud.sass.registerGlobal`, () => {
    beforeEach(async () => {
      bud = await factory()
      await bud.extensions.add(BudSass)
    })

    it(`should add global to \`additionalData\``, async () => {
      bud.sass.registerGlobal(`$foo: rgba(0, 0, 0, 1);`)

      await bud.extensions.runAll(`configAfter`)
      expect(bud.build.items.sass.getOptions().additionalData).toBe(
        `$foo: rgba(0, 0, 0, 1);`,
      )
    })

    it(`should import partials from an array`, async () => {
      bud.sass.registerGlobal([
        `$foo: rgba(0, 0, 0, 1);`,
        `$bar: rgba(255, 255, 255, 1);`,
      ])

      await bud.extensions.runAll(`configAfter`)

      expect(bud.build.items.sass.getOptions().additionalData).toBe(
        `$foo: rgba(0, 0, 0, 1);\n$bar: rgba(255, 255, 255, 1);`,
      )
    })
  })
})
