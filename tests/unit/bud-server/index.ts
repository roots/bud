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

      dev: 'http://localhost:3000',
      proxy: 'http://localhost:8080',

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

  it('has inject method', () => {
    expect(bud.server.inject).toBeInstanceOf(Function)
  })

  it('has expected assets property', () => {
    expect(bud.server.assets).toEqual([
      `@roots/bud-server/client.js`,
    ])
  })
})
