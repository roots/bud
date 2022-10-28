import {beforeEach, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {Watcher} from '../server/server.watcher'
import {Server} from './service'

export default () => {
  let bud: Bud
  let instance: Server

  beforeAll(async () => {
    bud = await factory({mode: `development`})

    expect(bud.context.args.dry).toBe(true)
    expect(bud.mode).toBe(`development`)

    instance = new Server(bud)
    await instance.register(bud)

    try {
      await instance.run()
    } catch (e) {}
  })

  it(`should be an instance of Server`, () => {
    expect(instance).toBeInstanceOf(Server)
  })

  it(`should have run method`, () => {
    expect(instance.run).toBeInstanceOf(Function)
  })

  it(`should have availableMiddleware property`, async () => {
    expect(instance.availableMiddleware).toMatchSnapshot()
  })

  it(`should have enabledMiddleware property`, async () => {
    expect(instance.enabledMiddleware).toMatchSnapshot()
  })

  it(`should have an application property that is an express application`, async () => {
    expect(instance.application).toHaveProperty(`set`)
    expect(instance.application).toHaveProperty(`get`)
    expect(instance.application).toHaveProperty(`listen`)
  })

  it(`should have a watcher property`, async () => {
    expect(instance.watcher).toBeInstanceOf(Watcher)
  })
}
