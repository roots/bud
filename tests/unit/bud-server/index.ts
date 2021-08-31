import {factory, Framework} from '@roots/bud'

describe('@roots/bud-server', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      mode: 'development',
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has expected defaults', () => {
    expect(bud.server.config.all()).toMatchSnapshot({
      browser: {
        indicator: true,
        log: true,
        overlay: true,
      },
      host: 'localhost',
      methods: ['GET', 'HEAD'],
      middleware: {
        dev: true,
        hot: true,
        proxy: false,
      },
      port: 3000,
      proxy: {host: 'localhost', port: 8000},
      watch: {
        files: [],
        options: {},
      },
    })
  })

  it('is modifiable', () => {
    expect(bud.server.config.get('browser.indicator')).toBe(true)
    bud.server.config.set('browser.indicator', false)
    expect(bud.server.config.get('browser.indicator')).toBe(
      false,
    )
  })

  it('has run method', () => {
    expect(bud.server.run).toBeInstanceOf(Function)
  })

  it('has inject method', () => {
    expect(bud.server.inject).toBeInstanceOf(Function)
  })

  it('has expected assets property', () => {
    expect(bud.server.assets).toEqual([
      `${process.cwd()}/packages/@roots/bud-server/src/client/index.js`,
    ])
  })

  it('is not watching by default', () => {
    expect(bud.server.isWatchable).toBe(false)
  })
})
