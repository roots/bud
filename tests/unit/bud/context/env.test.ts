import {join} from 'node:path'

import {paths} from '@repo/constants'
import {Bud, factory} from '@repo/test-kit/bud'
import Env from '@roots/bud/context/env'
import EnvService from '@roots/bud/services/env'
import {beforeAll, describe, expect, it} from 'vitest'

const path = join(paths.root, `tests`, `unit`, `bud`, `context`, `mock`)

describe(`env`, function () {
  describe(`service`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it(`should have env service`, () => {
      expect(bud.env).toBeInstanceOf(EnvService)
    })

    it(`should have env values`, () => {
      expect(bud.env.repository.PUBLIC_APP_TITLE).toEqual(
        `bud.js test app`,
      )
    })

    it(`should have env values accessible by get`, () => {
      expect(bud.env.get(`PUBLIC_APP_TITLE`)).toEqual(`bud.js test app`)
    })
  })

  describe(`context`, () => {
    let env: Record<string, any>

    beforeAll(() => {
      env = new Env(path)
      env = env.data
    })

    it(`.env env`, () => {
      expect(env.BUD_PROJECT_ENV_TEST).toEqual(`BUD_PROJECT_ENV_TEST`)
    })

    it(`expand .env`, () => {
      expect(env.BUD_EXPAND_BASE).toEqual(`basic`)
    })

    it(`expanded .env`, () => {
      expect(env.BUD_EXPAND_EXPAND).toEqual(`basic`)
    })

    it(`concatenate expanded .env`, () => {
      expect(env.BUD_EXPAND_CONCAT).toEqual(`basicworks`)
    })

    it(`lower level env not interpolated`, () => {
      expect(env.BUD_PROJECT_ENV_IGNORE_INTERPOLATION).toEqual(
        `\${BUD_PROJECT_ENV_TEST}_IGNORE_INTERPOLATION`,
      )
    })

    it(`malformed env throws`, () => {
      try {
        expect(new Env(join(path, `bad-env`))).toThrow()
      } catch (e) {}
    })
  })
})
