import {Framework, setupBud, teardownBud} from '../util'

describe('server', function () {
  describe('config', () => {
    let bud: Framework

    beforeAll(() => {
      bud = setupBud('development')
    })

    afterAll(() => {
      bud = teardownBud(bud)
    })

    it('has expected defaults', () => {
      expect(bud.server.config.all()).toEqual({
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
          files: [
            '**/*.html',
            '**/*.php',
            '**/*.ejs',
            '!node_modules',
            '!vendor',
          ],
          options: {persistant: false},
        },
      })
    })

    it('is modifiable', () => {
      expect(bud.server.config.get('browser.indicator')).toBe(
        true,
      )
      bud.server.config.set('browser.indicator', false)
      expect(bud.server.config.get('browser.indicator')).toBe(
        false,
      )
    })
  })

  describe('has expected shape', () => {
    let bud: Framework

    beforeAll(() => {
      bud = setupBud('development')
    })

    afterAll(() => {
      bud = teardownBud(bud)
    })

    it('has run method', () => {
      expect(bud.server.run).toBeInstanceOf(Function)
    })

    it('has inject method', () => {
      expect(bud.server.inject).toBeInstanceOf(Function)
    })

    it('has watcher property', () => {
      expect(bud.server.watcher).toHaveProperty('close')
      expect(bud.server.watcher).toHaveProperty('on')
    })

    it('has instance property', () => {
      expect(bud.server.instance).toHaveProperty('on')
      expect(bud.server.instance).toHaveProperty('use')
    })

    it('has expected assets property', () => {
      expect(bud.server.assets).toEqual([
        `${process.cwd()}/packages/@roots/bud-server/lib/cjs/client/index.js`,
      ])
    })

    it('is watchable', () => {
      expect(bud.server.isWatchable).toBe(true)
    })
  })
})

// middleware: Server.Middleware.Inventory

// assets: string[]

// instance: Server.Instance

// config: Server.Config

// isWatchable: boolean

// getWatchedFilesArray(): string[]

// run(): this

// inject(): void
