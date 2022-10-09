import {beforeAll, describe, expect, it} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud'

import BudTypescript from '../index'
import BudTypeCheck from './index'

describe(`@roots/bud-typescript/typecheck`, () => {
  let bud: Bud
  let typecheck

  beforeAll(async () => {
    bud = await factory().then(async bud => {
      await bud.extensions.add(BudTypescript)
      return bud
    })
    typecheck = new BudTypeCheck(bud)
    await typecheck.init()
  })

  it(`has expected default options`, () => {
    expect(typecheck.options).toEqual(
      expect.objectContaining({
        async: false,
        typescript: expect.objectContaining({
          typescriptPath: expect.stringContaining(`typescript`),
          diagnosticOptions: expect.objectContaining({
            semantic: true,
            syntactic: true,
          }),
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
      bud.typescript.typecheck.enable()
      // @ts-ignore
      const status = bud.extensions
        .get(`@roots/bud-typescript`)
        .getOption(`transpileOnly`)

      expect(status).toBe(false)
    })

    it(`typecheck.disable`, async () => {
      bud.typescript.typecheck.disable()

      const status = await bud.extensions
        .get(`@roots/bud-typescript/typecheck`)
        .isEnabled()

      expect(status).toBeFalsy()
    })
  })
})
