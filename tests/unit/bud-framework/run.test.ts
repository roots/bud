import {Bud, factory} from '@repo/test-kit/bud'
import {run} from '@roots/bud-framework/methods/run'
import {Service} from '@roots/bud-framework/service'
import {noop} from 'lodash-es'
import {describe, expect, it, vi} from 'vitest'

class MockCompiler extends Service {
  public compile = vi.fn(() => ({run: this.invoke}))
  public invoke = vi.fn(noop)
  public callback = vi.fn(noop)
}

class MockServer extends Service {
  public run = vi.fn(noop)
}

describe(`bud.run`, function () {
  let bud: Bud

  it(`is a function`, async () => {
    bud = await factory()
    expect(JSON.stringify(run)).toEqual(JSON.stringify(bud.run))
  })
})
