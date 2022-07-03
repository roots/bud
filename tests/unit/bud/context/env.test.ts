import {log} from '@repo/logger'
import {Env} from '@roots/bud/context/env'
import {dirname, join} from 'node:path'

describe('unit', function () {
  describe('context', () => {
    describe('env', () => {
      let env: Env

      const path = join(
        process.cwd(),
        'tests',
        'unit',
        'bud',
        'context',
        'mock',
      )

      beforeAll(() => {
        env = new Env(path)
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
