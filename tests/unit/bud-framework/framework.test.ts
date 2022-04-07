import {Bud, factory} from '@repo/test-kit/bud'
import {Container} from '@roots/container'
import {noop} from 'lodash'

describe('bud', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('mode', () => {
    expect(bud.mode).toEqual('production')
  })

  it('isDevelopment', async () => {
    const isNotDev = await factory({mode: 'production'})
    expect(isNotDev.isDevelopment).toEqual(false)

    const isDev = await factory({mode: 'development'})
    expect(isDev.isDevelopment).toEqual(true)
  })

  it('isProduction', async () => {
    const isNotProduction = await factory({mode: 'development'})
    expect(isNotProduction.isProduction).toEqual(false)

    const isProduction = await factory({mode: 'production'})
    expect(isProduction.isProduction).toEqual(true)
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

  it('sequence calls fns', async () => {
    await bud.sequence([
      async bud => {
        expect(bud).toBeInstanceOf(Bud)
      },
      async bud => {
        expect(bud).toBeInstanceOf(Bud)
      },
    ])
  })

  it('pipe passes value through fn chain', done => {
    const cb1 = app => app
    const cb2 = app => app

    const res = bud.pipe([cb1, cb2])

    expect(res).toBe(bud)

    done()
  })

  it('when calls fns conditionally', done => {
    const whenTrue = jest.fn((app: Bud) => {})
    bud.when(() => true, whenTrue)
    expect(whenTrue).toHaveBeenCalledTimes(1)

    const whenFalse = jest.fn((app: Bud) => {})
    bud.when(() => false, noop, whenFalse)
    expect(whenFalse).toHaveBeenCalledTimes(1)

    done()
  })

  it('has close fn', () => {
    expect(bud.close).toBeInstanceOf(Function)
  })
})
