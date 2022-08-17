import {beforeAll, describe, expect, it} from '@jest/globals'
import {logger} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'
import Express from 'express'

import {Watcher} from '../server/server.watcher'
import {Server} from './service'

export default () => {
  let bud: Bud
  let instance: Server

  beforeAll(async () => {
    bud = await factory({mode: `development`})
    instance = new Server(bud)
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

  describe(`in development`, () => {
    let development: Bud
    let instance: Server

    beforeAll(async () => {
      development = await factory({mode: `development`})
      instance = new Server(development)
      await instance.register()
      await instance.boot()
    })

    it(`should have an application property that is an express application`, async () => {
      expect(instance.application).toHaveProperty(`set`)
      expect(instance.application).toHaveProperty(`get`)
      expect(instance.application).toHaveProperty(`listen`)
    })

    it(`should have a watcher property`, async () => {
      expect(instance.watcher).toBeInstanceOf(Watcher)
    })

    it(`should have expected defaults`, async () => {
      expect(instance.app.hooks.filter(`dev.url`)).toMatchSnapshot()
      expect(
        instance.app.hooks.filter(`dev.watch.files`),
      ).toMatchSnapshot()
      expect(
        instance.app.hooks.filter(`dev.watch.options`),
      ).toMatchSnapshot()
      expect(
        instance.app.hooks.filter(`dev.client.scripts`),
      ).toMatchSnapshot()
    })
  })

  describe(`in production`, () => {
    let production: Bud

    beforeAll(async () => {
      production = await factory({mode: `production`})
    })

    it(`should not be defined`, () => {
      expect(production.server).toBeUndefined()
    })
  })
}
