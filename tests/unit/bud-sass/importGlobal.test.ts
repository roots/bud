import {Bud, factory} from '@repo/test-kit/bud'
import BudSass from '@roots/bud-sass'

describe('@roots/bud-sass registration', () => {
  let bud: Bud

  describe('bud.sass.importGlobal', () => {
    beforeEach(async () => {
      bud = await factory()
      await bud.extensions.add(BudSass)
    })

    it('should import a partial', async () => {
      bud.sass.importGlobal('@styles/common/variables')

      await bud.extensions.runAll('_afterConfig')
      expect(bud.build.items.sass.getOptions().additionalData).toBe(
        `@import "@styles/common/variables";`,
      )
    })

    it('should import partials from an array', async () => {
      bud.sass.importGlobal([
        '@styles/common/variables',
        '@styles/common/mixins',
      ])

      await bud.extensions.runAll('_afterConfig')

      expect(bud.build.items.sass.getOptions().additionalData).toBe(
        `@import "@styles/common/variables";\n@import "@styles/common/mixins";`,
      )
    })
  })
})
