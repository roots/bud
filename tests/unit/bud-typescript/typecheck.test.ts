import {Bud, factory} from '@repo/test-kit/bud'
import BudTypescript from '@roots/bud-typescript'
import BudTypeCheck from '@roots/bud-typescript/typecheck'

describe('@roots/bud-typescript/typecheck', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory().then(async bud => {
      await bud.extensions.add(BudTypescript)
      return bud
    })
  })

  it('is enabled by @roots/bud-typescript', () => {
    expect(
      bud.extensions.has('@roots/bud-typescript/typecheck'),
    ).toBeTruthy()
  })

  it('has expected default options', () => {
    expect(bud.typescript.typecheck.options).toStrictEqual({
      async: false,
      typescript: {
        typescriptPath: require.resolve('typescript'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    })
  })

  describe('bud.typescript', () => {
    it('is exposed', () => {
      expect(bud.typescript.typecheck).toBeInstanceOf(BudTypeCheck)
    })

    it('typecheck.enable', async () => {
      bud.typescript.typecheck.enable()
      const status = await bud.extensions
        .get('@roots/bud-typescript/typecheck')
        .isEnabled()

      expect(status).toBeTruthy()
    })

    it('typecheck.disable', async () => {
      bud.typescript.typecheck.disable()

      const status = await bud.extensions
        .get('@roots/bud-typescript/typecheck')
        .isEnabled()

      expect(status).toBeFalsy()
    })
  })
})
