import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

import BudTypescript from '../index.js'
import BudTypeCheck from './index.js'

describe(`@roots/bud-typescript/typecheck`, () => {
  let bud: Bud
  let typecheck: BudTypeCheck

  beforeAll(async () => {
    bud = await factory().then(async bud => {
      await bud.extensions.add(BudTypescript)
      return bud
    })

    typecheck = new BudTypeCheck(bud)

    if (typeof typecheck.init === `function`) await typecheck.init(bud)
  })

  it(`has expected default options`, () => {
    expect(typecheck.options).toEqual(
      expect.objectContaining({
        async: true,
        logger: {
          log: expect.any(Function),
          error: expect.any(Function),
        },
        typescript: expect.objectContaining({
          configFile: expect.stringMatching(/tsconfig\.json$/),
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: `readonly`,
          typescriptPath: expect.stringMatching(/typescript\.js$/),
        }),
      }),
    )
  })

  describe(`bud.typescript`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory().then(async bud => {
        await bud.extensions.add(BudTypescript)
        return bud
      })
    })

    it(`typecheck.enable`, async () => {
      expect(
        await bud.extensions
          .get(`@roots/bud-typescript/typecheck`)
          .isEnabled(),
      ).toBe(false)

      bud.typescript.typecheck.enable()

      expect(
        bud.extensions.get(`@roots/bud-typescript`).getOption(`transpileOnly`)
      ).toBe(true)

      expect(
        await bud.extensions
          .get(`@roots/bud-typescript/typecheck`)
          .isEnabled(),
      ).toBe(true)
    })

    it(`typecheck.disable`, async () => {
      bud.typescript.typecheck.enabled = false

      bud.typescript.typecheck.disable()

      const status = await bud.extensions
        .get(`@roots/bud-typescript/typecheck`)
        .isEnabled()

      expect(status).toBeFalsy()
    })
  })
})
