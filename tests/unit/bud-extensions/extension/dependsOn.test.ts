import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {dependsOn} from '@roots/bud-framework/extension/decorators'

class MockExtension extends Extension {
  public label = `mock-extension`
  public dependsOn = new Set([`@roots/bud-babel`])
}

@dependsOn([`@roots/bud-babel`])
// @ts-ignore
class MockDecoratedExtension extends Extension {
  public label = `mock-extension`
}

const resetExtensions = (bud: Bud) => {
  // @ts-ignore
  bud.extensions.repository = {}
}

describe.skip(`Extension`, function () {
  describe(`dependsOn`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    beforeEach(async () => {
      resetExtensions(bud)
    })

    afterAll(async () => bud.close())

    it(`adds dependencies`, async () => {
      await bud.extensions.add(MockExtension)
      expect(Object.keys(bud.extensions.repository)).toStrictEqual(
        expect.arrayContaining([`@roots/bud-babel`, `mock-extension`]),
      )
    })

    it(`adds dependencies (decorated)`, async () => {
      await bud.extensions.add(MockDecoratedExtension)
      expect(Object.keys(bud.extensions.repository)).toStrictEqual(
        expect.arrayContaining([`@roots/bud-babel`, `mock-extension`]),
      )
    })
  })
})
