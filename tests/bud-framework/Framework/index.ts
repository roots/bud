import {Container} from '@roots/container'
import {Bud, Framework, setupBud, teardownBud} from '../../util'
import {noop} from 'lodash'

describe('bud', () => {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('mode', () => {
    expect(bud.mode).toEqual('production')
  })

  it('setMode changes the mode', () => {
    bud.setMode('development')
    expect(bud.mode).toEqual('development')
  })

  it('setMode returns the mode', () => {
    expect(bud.getMode()).toBe(bud.mode)
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

  it('access processes a literal value', done => {
    expect(bud.access(true)).toEqual(true)
    done()
  })

  it('access processes a fn', done => {
    expect(bud.access(() => true)).toEqual(true)
    done()
  })

  it('access passes bud as a param', done => {
    expect(bud.access(bud => bud)).toEqual(bud)
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
      (app: Framework) => {
        expect(app).toBeInstanceOf(Bud)
      },
    )

    bud.when(
      () => false,
      noop,
      (app: Framework) => {
        expect(app).toBeInstanceOf(Bud)
      },
    )

    done()
  })
})
