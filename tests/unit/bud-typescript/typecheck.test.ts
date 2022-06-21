import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud-framework'
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
    expect(bud.typescript.typecheck.options).toEqual(
      expect.objectContaining({
        async: false,
        typescript: expect.objectContaining({
          typescriptPath: expect.stringContaining('typescript'),
          diagnosticOptions: expect.objectContaining({
            semantic: true,
            syntactic: true,
          }),
        }),
      }),
    )
  })

  describe('bud.typescript', () => {
    it('is exposed', () => {
      expect(bud.typescript.typecheck).toBeInstanceOf(BudTypeCheck)
    })

    it('typecheck.enable', async () => {
      bud.typescript.typecheck.enable()
      // @ts-ignore
      const status = bud.extensions
        .get('@roots/bud-typescript')
        .getOption('transpileOnly')

      expect(status).toBe(false)
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
