import {Framework, setupBud, teardownBud} from '../../util'
import * as sage from '@roots/sage'

describe('@roots/sage', () => {
  describe('settings', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud()
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('has extension name', () => {
      expect(sage.name).toBe('@roots/sage')
    })

    it('has extension boot method', () => {
      expect(sage.boot).toBeInstanceOf(Function)
    })

    it('has expected paths', () => {
      bud.use(sage)

      expect(bud.path('storage')).toEqual(
        process.cwd().concat('/storage/bud'),
      )
      expect(bud.publicPath()).toEqual('public/')
      expect(bud.path('dist')).toEqual(
        process.cwd().concat('/public'),
      )
      expect(bud.path('src')).toEqual(
        process.cwd().concat('/resources'),
      )
    })

    it('has expected aliases', () => {
      const {alias: aliases} = bud.build.config.resolve

      bud.use(sage)

      expect(aliases['@fonts']).toEqual(
        process.cwd().concat('/resources/fonts'),
      )
      expect(aliases['@images']).toEqual(
        process.cwd().concat('/resources/images'),
      )
      expect(aliases['@scripts']).toEqual(
        process.cwd().concat('/resources/scripts'),
      )
      expect(aliases['@styles']).toEqual(
        process.cwd().concat('/resources/styles'),
      )
    })
  })

  describe('react', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development')
      bud.discovery.setStore({})
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-react')).toEqual(
        false,
      )
      done()
    })

    it('used when peer deps present', done => {
      bud.discovery
        .set('dependencies.react', '99.99')
        .set('dependencies.react-dom', '99.99')
      bud.use(sage)

      expect(bud.extensions.has('@roots/bud-react')).toEqual(
        true,
      )
      done()
    })
  })

  describe('postcss', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud()
      bud.discovery.setStore({})
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)

      expect(bud.extensions.has('@roots/bud-postcss')).toEqual(
        false,
      )

      done()
    })

    it('used when peer deps present', done => {
      bud.discovery.set('devDependencies.postcss', '*')
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-postcss')).toEqual(
        true,
      )
      done()
    })
  })

  describe('tailwindcss', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud()
      bud.discovery.setStore({})
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-tailwindcss'),
      ).toEqual(false)
      done()
    })

    it('used when peer deps present', done => {
      bud.discovery.set('devDependencies.tailwindcss', '*')
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-tailwindcss'),
      ).toEqual(true)
      done()
    })
  })

  describe('typescript', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development')
      bud.discovery.setStore({})
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-typescript'),
      ).toEqual(false)
      done()
    })

    it(`used when peer deps are present`, done => {
      bud.discovery.set('devDependencies.typescript', '*')
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-typescript'),
      ).toEqual(true)
      done()
    })
  })

  describe('esbuild', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud()
      bud.use(sage)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('is used', done => {
      expect(bud.extensions.has('@roots/bud-esbuild')).toEqual(
        true,
      )
      done()
    })
  })
})
