import {Bud, config, services} from '@roots/bud'

describe('server config', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('has expected defaults', () => {
    expect(this.bud.server.config.all()).toEqual({
      browser: {indicator: true, log: true, overlay: true},
      host: 'localhost',
      methods: ['GET', 'HEAD'],
      middleware: {dev: true, hot: true, proxy: false},
      port: 3000,
      proxy: {host: 'localhost', port: 8000},
      watch: {
        files: [
          '**/*.html',
          '**/*.php',
          '**/*.ejs',
          '!node_modules',
          '!vendor',
        ],
        options: {persistant: true},
      },
    })
  })
})

export {}
