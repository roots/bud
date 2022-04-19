import {Bud, factory} from '@repo/test-kit/bud'
import * as library from '@roots/bud-library'

describe('@roots/bud-library', () => {
  let bud: Bud

  it('has name prop', () => {
    expect(library.label).toBe('@roots/bud-library')
  })

  describe('module register', () => {
    beforeAll(async () => {
      bud = await factory()
      await bud.extensions.add(library)
    })

    it('is a method', () => {
      expect(library.register).toBeInstanceOf(Function)
    })
  })
})
