import {describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import {run} from '@roots/bud-framework/methods/run'
import {Service} from '@roots/bud-framework/service'
import {noop} from 'lodash-es'

class MockCompiler extends Service {
  public compile = jest.fn(() => ({run: this.invoke}))
  public invoke = jest.fn(noop)
  public callback = jest.fn(noop)
}

class MockServer extends Service {
  public run = jest.fn(noop)
}

describe(`bud.run`, function () {
  let bud: Bud

  it(`is a function`, async () => {
    bud = await factory()
    expect(JSON.stringify(run)).toEqual(JSON.stringify(bud.run))
  })

  describe(`production`, () => {
    it(`summons compiler`, async () => {
      bud = await factory()
      bud.compiler = new MockCompiler(bud) as any

      await run.call(bud)
      expect((bud.compiler as any).invoke).toHaveBeenCalled()
    })
  })

  describe(`development`, () => {
    it(`summons server`, async () => {
      bud = await factory({mode: `development`})
      bud.compiler = new MockCompiler(bud) as any
      bud.server = new MockServer(bud) as any

      await run.call(bud)
      expect((bud.server as any).run).toHaveBeenCalled()
    })
  })
})
