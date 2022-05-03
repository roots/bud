import {Bud, factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'
import {dependsOn} from '@roots/bud-framework/extension/decorators'

class MockExtension extends Extension {
  public label = 'mock-extension'
  public dependsOn = new Set(['@roots/bud-babel'])
}

@dependsOn(['@roots/bud-babel'])
class MockDecoratedExtension extends Extension {
  public label = 'mock-extension'
}

const resetExtensions = bud => {
  bud.extensions.repository = {}
}

describe('Extension', function () {
  describe('dependsOn', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    beforeEach(async () => {
      resetExtensions(bud)
    })

    it('adds dependencies', async () => {
      await bud.extensions.add(MockExtension)
      expect(Object.keys(bud.extensions.repository)).toStrictEqual(
        expect.arrayContaining(['@roots/bud-babel', 'mock-extension']),
      )
    })

    it('adds dependencies (decorated)', async () => {
      await bud.extensions.add(MockDecoratedExtension)
      expect(Object.keys(bud.extensions.repository)).toStrictEqual(
        expect.arrayContaining(['@roots/bud-babel', 'mock-extension']),
      )
    })
  })
})
