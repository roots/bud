import {Bud, factory} from '@roots/bud'
import {Container} from '@roots/container'
import {noop} from 'lodash'

process.env.BUD_KEEP_ALIVE = 'true'

describe('bud', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })
  })

  it('mode', () => {
    expect(bud.mode).toEqual('production')
  })

  it('isDevelopment', () => {
    bud.mode = 'production'
    expect(bud.isDevelopment).toEqual(false)

    bud.mode = 'development'
    expect(bud.isDevelopment).toEqual(true)
  })

  it('isProduction', done => {
    bud.mode = 'production'
    expect(bud.isProduction).toEqual(true)

    bud.mode = 'development'
    expect(bud.isProduction).toEqual(false)

    done()
  })

  it('maybeCall processes a literal value', done => {
    expect(bud.maybeCall(true)).toEqual(true)
    done()
  })

  it('maybeCall processes a fn', done => {
    expect(bud.maybeCall(() => true)).toEqual(true)
    done()
  })

  it('maybeCall passes bud as a param', done => {
    expect(bud.maybeCall(bud => bud)).toEqual(bud)
    done()
  })

  it('container is instance of @roots/container', done => {
    expect(bud.container()).toBeInstanceOf(Container)
    done()
  })

  it('tap calls fn and returns instance of Bud', done => {
    const fn = jest.fn()
    expect(bud.tap(fn)).toBeInstanceOf(Bud)
    expect(fn).toHaveBeenCalledTimes(1)
    done()
  })

  it('tap passes an instance of Bud', done => {
    bud.tap(app => expect(app).toBeInstanceOf(Bud))
    done()
  })

  it('tap can bind a function to Bud', done => {
    bud.tap(function () {
      expect(this).not.toBeInstanceOf(Bud)
    }, false)

    bud.tap(function () {
      expect(this).toBeInstanceOf(Bud)
    }, true)

    // it binds by default
    bud.tap(function () {
      expect(this).toBeInstanceOf(Bud)
    })

    done()
  })

  it('sequence calls fns', done => {
    bud.sequence([
      app => {
        expect(app).toBeInstanceOf(Bud)
      },
      app => {
        expect(app).toBeInstanceOf(Bud)
      },
      app => {
        expect(app).toBeInstanceOf(Bud)
      },
    ])

    done()
  })

  it('pipe passes value through fn chain', done => {
    const cb1 = app => app
    const cb2 = app => app

    const res = bud.pipe([cb1, cb2])

    expect(res).toBe(bud)

    done()
  })

  it('when calls fns conditionally', done => {
    bud.when(
      () => true,
      (app: Bud) => {
        expect(app).toBeInstanceOf(Bud)
      },
    )

    bud.when(
      () => false,
      noop,
      (app: Bud) => {
        expect(app).toBeInstanceOf(Bud)
      },
    )

    done()
  })

  it('has close fn', () => {
    expect(bud.close).toBeInstanceOf(Function)
  })
})
