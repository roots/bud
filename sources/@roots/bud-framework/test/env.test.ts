import {type Bud} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import Env from '../src/env/index.js'

describe(`@roots/bud-framework/env`, () => {
  it(`should be a container service`, async () => {
    const bud = {
      context: {
        env: {},
      },
    } as Bud
    const instance = new Env(() => bud)
    expect(instance.constructor.name).toBe(`Env`)
  })

  describe(`getPublicEnv`, () => {
    it(`should return the public env variables`, async () => {
      const bud = {
        context: {
          env: {
            PRIVATE_TEST: `test`,
            PUBLIC_TEST: `test`,
          },
        },
      } as unknown as Bud
      const instance = new Env(() => bud)
      await instance.bootstrap(bud)
      expect(instance.getPublicEnv()).toStrictEqual({
        TEST: `test`,
      })
    })
  })

  describe(`getEnv`, () => {
    it(`should return the env variables`, async () => {
      const bud = {
        context: {
          env: {
            PRIVATE_TEST: `test`,
            PUBLIC_TEST: `test`,
          },
        },
      } as unknown as Bud
      const instance = new Env(() => bud)
      await instance.bootstrap(bud)
      expect(instance.all()).toStrictEqual({
        PRIVATE_TEST: `test`,
        PUBLIC_TEST: `test`,
      })
    })
  })

  describe(`initial values`, async () => {
    it(`should coerce 'true' to true`, async () => {
      const bud = {
        context: {
          env: {
            TEST: `true`,
          },
        },
      } as unknown as Bud
      const instance = new Env(() => bud)
      await instance.bootstrap(bud)
      expect(instance.get(`TEST`)).toBe(true)
    })

    it(`should coerce 'false' to false`, async () => {
      const bud = {
        context: {
          env: {
            TEST: `false`,
          },
        },
      } as unknown as Bud
      const instance = new Env(() => bud)
      await instance.bootstrap(bud)
      expect(instance.get(`TEST`)).toBe(false)
    })

    it(`should be fine with no initial env`, async () => {
      const bud = {
        context: {
          env: {},
        },
      } as unknown as Bud
      const instance = new Env(() => bud)
      await instance.bootstrap(bud)
      expect(instance.repository).toStrictEqual({})
    })
  })
})
