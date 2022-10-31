import {Bud, factory} from '@repo/test-kit/bud'
import {Container} from '@roots/container'
import {noop} from 'lodash-es'
import {describe, expect, it, vi} from 'vitest'

describe.skip(`bud`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })
  it(`mode`, async () => {
    expect(bud.mode).toEqual(`production`)
  })

  it(`maybeCall processes a literal value`, async () => {
    expect(bud.maybeCall(true)).toEqual(true)
  })

  it(`maybeCall processes a fn`, async () => {
    expect(bud.maybeCall(() => true)).toEqual(true)
  })

  it(`maybeCall passes bud as a param`, async () => {
    expect(bud.maybeCall(bud => bud)).toEqual(bud)
  })

  it(`container is instance of @roots/container`, async () => {
    expect(bud.container()).toBeInstanceOf(Container)
  })

  it(`tap calls fn and returns instance of Bud`, async () => {
    const fn = vi.fn()
    expect(bud.tap(fn)).toBeInstanceOf(Bud)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it(`tap passes an instance of Bud`, async () => {
    bud.tap(app => expect(app).toBeInstanceOf(Bud))
  })

  it(`tap can bind a function to Bud`, async () => {
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
  })

  it(`sequence calls fns`, async () => {
    await bud.sequence([
      async bud => {
        expect(bud).toBeInstanceOf(Bud)
      },
      async bud => {
        expect(bud).toBeInstanceOf(Bud)
      },
    ])
  })

  it(`pipe passes value through fn chain`, async () => {
    const cb1 = app => app
    const cb2 = app => app

    const res = bud.pipe([cb1, cb2])

    expect(res).toBe(bud)
  })

  it(`when calls fns conditionally`, async () => {
    const whenTrue = vi.fn((app: Bud) => {})
    bud.when(() => true, whenTrue)
    expect(whenTrue).toHaveBeenCalledTimes(1)

    const whenFalse = vi.fn((app: Bud) => {})
    bud.when(() => false, noop, whenFalse)
    expect(whenFalse).toHaveBeenCalledTimes(1)
  })

  it(`has close fn`, async () => {
    expect(bud.close).toBeInstanceOf(Function)
  })
})
