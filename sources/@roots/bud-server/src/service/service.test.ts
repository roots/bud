import {beforeAll, describe, expect, it} from '@jest/globals'
import {logger} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'
import {EventEmitter} from 'node:events'

import {Watcher} from '../server/server.watcher'
import {Server} from './service'

describe('@roots/bud-server', () => {
  let bud: Bud
  let instance: Server

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    instance = new Server(bud)
  })

  it('is a service', () => {
    expect(instance).toBeInstanceOf(Server)
  })

  it('has run method', () => {
    expect(instance.run).toBeInstanceOf(Function)
  })

  it('has an available middleware', async () => {
    expect(instance.availableMiddleware).toMatchSnapshot()
  })

  it('has an enabled middleware', async () => {
    expect(instance.enabledMiddleware).toMatchSnapshot()
  })

  describe('in development', () => {
    let development: Bud

    beforeAll(async () => {
      development = await factory({mode: 'development'})
      await development.hooks.fire('server.before')
      logger.log(development.server)
    })

    it('has an express instance', async () => {
      logger.log(development.server)
      expect(development.server.application).toBeInstanceOf(EventEmitter)
    })

    it('has a watcher instance', async () => {
      expect(development.server.watcher).toBeInstanceOf(Watcher)
    })

    it('has expected defaults', () => {
      expect(development.hooks.filter('dev.url')).toMatchSnapshot()
      expect(development.hooks.filter('dev.watch.files')).toMatchSnapshot()
      expect(
        development.hooks.filter('dev.watch.options'),
      ).toMatchSnapshot()
      expect(
        development.hooks.filter('dev.client.scripts'),
      ).toMatchSnapshot()
    })

    it('has an express instance', () => {
      expect(development.server.application).toHaveProperty('set')
    })
  })

  describe('in production', () => {
    let production: Bud

    beforeAll(async () => {
      production = await factory({mode: 'production'})
    })

    it('does not exist in production', () => {
      expect(production.server).toBeUndefined()
    })
  })
})
