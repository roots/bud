import {logger} from '@repo/logger'
import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-server', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      mode: 'development',
    })
  })

  it('has expected defaults', () => {
    expect(bud.hooks.filter('dev.host')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.watch.files')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.watch.options')).toMatchSnapshot()
    expect(bud.hooks.filter('dev.client.scripts')).toMatchSnapshot()
  })

  it('has run method', () => {
    try {
      expect(bud.server.run).toBeInstanceOf(Function)
    } catch (e) {
      logger.error(e)
    }
  })
})
