import {Bud, factory} from '@roots/bud'

describe('@roots/bud-server', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        mode: 'development',
        features: {
          log: false,
          dashboard: false,
        },
      },
    })
  })

  it('has expected defaults', () => {
    expect(bud.store.get('server')).toMatchSnapshot({
      browser: {
        indicator: true,
        log: true,
        overlay: true,
      },
      middleware: {
        dev: true,
        hot: true,
        proxy: false,
      },

      dev: {
        url: 'http://localhost:3000',
      },
      proxy: {
        url: 'http://localhost',
        replace: {
          href: true,
          window: true,
          publicPath: true,
        },
      },

      watch: {
        files: [],
      },
    })
  })

  it('is modifiable', () => {
    expect(bud.store.get('server.browser.indicator')).toBe(true)
    bud.store.set('server.browser.indicator', false)
    expect(bud.store.get('server.browser.indicator')).toBe(false)
  })

  it('has run method', () => {
    expect(bud.server.run).toBeInstanceOf(Function)
  })
})
