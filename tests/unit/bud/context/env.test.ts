import {Env} from '@roots/bud/context/env'

describe('unit', function () {
  describe('context', () => {
    describe('env', () => {
      let impl: Env

      beforeAll(() => {
        impl = new Env(process.cwd())
      })

      test('TS_JEST env present', () => {
        expect(impl.JEST_WORKER_ID).toEqual(expect.any(String))
      })
    })
  })
})
