import {paths} from '@repo/constants'
import Env from '@roots/bud/context/env'
import {join} from 'node:path'

const path = join(paths.root, 'tests', 'unit', 'bud', 'context', 'mock')

describe('unit', function () {
  describe('context', () => {
    describe('env', () => {
      let env: Record<string, any>

      beforeAll(() => {
        env = new Env(path)
        env = env.data
      })

      test('.env env', () => {
        expect(env.BUD_PROJECT_ENV_TEST).toEqual('BUD_PROJECT_ENV_TEST')
      })

      test('process env', () => {
        expect(env.JEST_WORKER_ID).toEqual(expect.any(String))
      })

      test('expand .env', () => {
        expect(env.BUD_EXPAND_BASE).toEqual('basic')
      })

      test('expanded .env', () => {
        expect(env.BUD_EXPAND_EXPAND).toEqual('basic')
      })

      test('concatenate expanded .env', () => {
        expect(env.BUD_EXPAND_CONCAT).toEqual('basicworks')
      })

      test('lower level env not interpolated', () => {
        expect(env.BUD_PROJECT_ENV_IGNORE_INTERPOLATION).toEqual(
          '${BUD_PROJECT_ENV_TEST}_IGNORE_INTERPOLATION',
        )
      })

      test('malformed env throws', () => {
        try {
          expect(new Env(join(path, 'bad-env'))).toThrow()
        } catch (e) {}
      })
    })
  })
})
