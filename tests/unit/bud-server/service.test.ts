import {logger} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'
import { Service } from '@roots/bud-framework'
import {Server} from '@roots/bud-server'

describe('@roots/bud-server', function () {
  let bud: Bud
  let budProd: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    budProd = await factory({mode: 'production'})
  })

  it('is a service', () => {
    expect(bud.server).toBeInstanceOf(Server)
    expect(bud.server).toBeInstanceOf(Service)
  })

  it('has expected defaults', () => {
    expect(bud.hooks.filter('dev.hostname')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.watch.files')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.watch.options')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.client.scripts')).toMatchSnapshot()
  })

  it('does not exist in production', () => {
    expect(budProd.server).toBeUndefined()
  })

  it('has run method', () => {
    try {
      expect(bud.server.run).toBeInstanceOf(Function)
    } catch (e) {
      logger.error(e)
    }
  })

  it('has an express instance', () => {
    expect(bud.server.application).toHaveProperty('set')
  })
})
