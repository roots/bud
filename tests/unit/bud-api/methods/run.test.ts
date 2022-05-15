import {Bud, factory} from '@repo/test-kit/bud'
import {run} from '@roots/bud-api/methods/run'
import {Service} from '@roots/bud-framework'
import {noop} from 'lodash'

class MockCompiler extends Service {
  public compile = jest.fn(() => ({run: this.run}))
  public run = jest.fn(noop)
  public callback = jest.fn(noop)
}

class MockServer extends Service {
  public run = jest.fn(noop)
}

describe('bud.run', function () {
  let bud: Bud

  describe('production', () => {
    beforeAll(async () => {
      bud = await factory()
      bud.compiler = new MockCompiler(bud) as any
    })

    it('is a function', () => {
      expect(JSON.stringify(run)).toEqual(
        JSON.stringify(bud.api.get('run')),
      )
    })

    it('summons compiler', async () => {
      await run.call(bud)
      expect((bud.compiler as any).run).toHaveBeenCalled()
    })
  })

  describe('development', () => {
    beforeAll(async () => {
      bud = await factory({mode: 'development'})
      bud.compiler = new MockCompiler(bud) as any
      bud.server = new MockServer(bud) as any
    })

    it('summon server in dev', async () => {
      await run.call(bud)
      expect((bud.server as any).run).toHaveBeenCalled()
    })
  })
})
