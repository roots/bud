import {Framework, setupBud, teardownBud} from '../util'

describe('server config', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    teardownBud(bud)
  })

  it('has expected defaults', () => {
    expect(bud.server.config.all()).toEqual({
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
