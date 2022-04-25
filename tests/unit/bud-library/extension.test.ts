import {Bud, factory} from '@repo/test-kit/bud'
import library from '@roots/bud-library'

describe('@roots/bud-library', () => {
  let bud: Bud

  describe('module register', () => {
    beforeAll(async () => {
      bud = await factory()
      await bud.extensions.add(library)
    })

    it('exposes class through library prop', () => {
      expect(bud.library).toBeInstanceOf(library)
    })
  })
})
