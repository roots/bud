import {describe, expect, it, vi} from 'vitest'

import Container from './index.js'
import {Repository} from '../lib/container.js'

describe(`container`, function () {
  describe(`constructor`, () => {
    it(`should be constructable`, () => {
      const container = new Container()
      expect(container).toBeInstanceOf(Container)
    })
  })

  describe(`get`, function () {
    it(`should return undefined when no value is set`, () => {
      const container = new Container()
      expect(container.get(`foo`)).toEqual(undefined)
    })

    it(`should return the keyed value`, () => {
      const repo = {foo: `bar`}
      const container = new Container(repo)
      expect(container.get(`foo`)).toBe(`bar`)
    })
  })

  describe(`all`, function () {
    it(`should return the raw repository`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      expect(container.all()).toBe(repo)
    })
  })

  describe(`set`, function () {
    it(`should return itself`, () => {
      const container = new Container()

      expect(container.set(`foo`, `bar`)).toBeInstanceOf(Container)
    })

    it(`should set a value`, () => {
      const container = new Container().set(`foo`, `bar`)

      expect(container.get(`foo`)).toEqual(`bar`)
    })
  })

  describe(`has`, () => {
    it(`should return true if item found`, () => {
      const container = new Container().set(`foo`, `bar`)

      expect(container.has(`foo`)).toEqual(true)
    })

    it(`should return false if item not found`, () => {
      const container = new Container().set(`foo`, `bar`)

      expect(container.has(`neverSet`)).toEqual(false)
    })
  })

  describe(`is`, function () {
    it(`should return true if value equals predicate`, () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is(`test`, 100)).toEqual(true)
    })

    it(`should return false if value does not equal predicate`, () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is(`test`, `notIt`)).toEqual(false)
    })
  })

  describe(`isTrue`, function () {
    it(`should return true if keyed value is true`, () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isTrue(`test`)).toEqual(true)
    })

    it(`should return false if keyed value is false`, () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isTrue(`test`)).toEqual(false)
    })

    it(`should return false if keyed value is not boolean`, () => {
      const repo = {test: `bar`}
      const container = new Container(repo)

      expect(container.isTrue(`test`)).toEqual(false)
    })
  })

  describe(`isFalse`, function () {
    it(`should return true if keyed value is false`, () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isFalse(`test`)).toEqual(true)
    })

    it(`should return false if keyed value is true`, () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isFalse(`test`)).toEqual(false)
    })

    it(`should return false if keyed value is not boolean`, () => {
      const repo = {test: `bar`}
      const container = new Container(repo)

      expect(container.isFalse(`test`)).toEqual(false)
    })
  })

  describe(`set`, function () {
    it(`adds a value to the repository`, () => {
      const repo = {foo: `bar`}
      const container = new Container()

      expect(container.set(`foo`, `bar`).all()).toEqual(repo)
    })
  })

  describe(`isArray`, function () {
    it(`should return true if value is an array`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isArray(`foo`)).toEqual(true)
    })
  })

  describe(`isDefined`, function () {
    it(`should return true if value is set`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isDefined(`foo`)).toEqual(true)
    })

    it(`should return false if value is not set`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isDefined(`bar`)).toEqual(false)
    })
  })

  describe(`isNotArray`, function () {
    it(`should return true if value is not an array`, () => {
      const repo = {foo: `bar`}
      const container = new Container(repo)

      expect(container.isNotArray(`foo`)).toEqual(true)
    })
  })

  describe(`isString`, function () {
    it(`should return true if value is a String`, () => {
      const repo = {foo: `bar`}
      const container = new Container(repo)

      expect(container.isString(`foo`)).toEqual(true)
    })
  })

  describe(`isNotString`, function () {
    it(`should return true if value is a String`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isNotString(`foo`)).toEqual(true)
    })
  })

  describe(`isNumber`, function () {
    it(`should return true if value is not a String`, () => {
      const repo = {foo: 100}
      const container = new Container(repo)

      expect(container.isNumber(`foo`)).toEqual(true)
    })
  })

  describe(`isNotNumber`, function () {
    it(`should return true if value is not a Number`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isNotNumber(`foo`)).toEqual(true)
    })
  })

  describe(`isNull`, function () {
    it(`should return true if value is null`, () => {
      const repo = {foo: null}
      const container = new Container(repo)

      expect(container.isNull(`foo`)).toEqual(true)
    })
  })

  describe(`isNotNull`, function () {
    it(`should return true if value is not null`, () => {
      const repo = {foo: [`bar`, `whiz`]}
      const container = new Container(repo)

      expect(container.isNotNull(`foo`)).toEqual(true)
    })
  })

  describe(`getMap`, function () {
    it(`should return an instance of Map`, () => {
      const repo = {key: `value`, anotherKey: `value2`}
      const container = new Container(repo)

      expect(container.getMap()).toBeInstanceOf(Map)
    })

    it(`should return Map with expected structure`, () => {
      const repo = {key: `value`, anotherKey: `value2`}
      const container = new Container(repo)

      expect(Array.from(container.getMap())).toEqual([
        [`key`, `value`],
        [`anotherKey`, `value2`],
      ])
    })
  })

  describe(`remove`, () => {
    it(`removes a value`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      container.remove(`foo`)

      expect(container.all()).toEqual({
        ergo: `dox`,
      })
    })
  })

  describe(`setStore`, () => {
    it(`should set the value of the repository property`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      const replacement = {oof: `yea`, ben: `word`}
      container.setStore(replacement)

      expect(container.all()).toEqual(replacement)
    })
  })

  describe(`mutateStore`, () => {
    it(`should take a functional callback`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      container.mutateStore(store => {
        expect(store).toBe(repo)
        return store
      })
    })

    it(`should mutate the store using the provided callback`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      const mutagen = store => Object.assign(store, {foo: `nea`})
      container.mutateStore(mutagen)

      expect(container.all()).toEqual({
        foo: `nea`,
        ergo: `dox`,
      })
    })
  })

  describe(`each`, () => {
    it(`should execute callback for each match`, () => {
      const repo = {
        foo: {
          test: `bar`,
          ergo: `dox`,
        },
      }
      const container: Container = new Container(repo)

      const callback = vi.fn()
      container.each(`foo`, callback)

      expect(callback).toBeCalledTimes(2)
    })
  })

  describe(`every`, () => {
    it(`should execute callback for every top level key`, () => {
      const repo = {
        foo: {
          test: `bar`,
          ergo: `dox`,
        },
      }
      const container: Container = new Container(repo)

      const callback = vi.fn()
      container.every(callback)

      expect(callback).toBeCalledTimes(1)
    })
  })

  describe(`transform`, () => {
    it(`should transform a value using a callback`, () => {
      const repo = {foo: 10}
      const container = new Container(repo)
      const result = container.transform(`foo`, v => {
        return v + 10
      })

      expect(result).toEqual(20)
    })
  })

  describe(`mutate`, () => {
    it(`should mutate a value using a callback`, () => {
      const repo = {foo: 10}
      const container = new Container(repo)
      container.mutate(`foo`, v => {
        return v + 10
      })

      expect(container.get(`foo`)).toEqual(20)
    })
  })

  describe(`mergeStore`, () => {
    it(`should merge a value with the repository property`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      expect(container.mergeStore({crash: `bandicoot`}).all()).toEqual({
        ...repo,
        crash: `bandicoot`,
      })
    })
  })

  describe(`getEntries`, () => {
    it(`retrieves repo as entries`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container(repo)

      expect(container.getEntries()).toEqual([
        [`foo`, `bar`],
        [`ergo`, `dox`],
      ])
    })
  })

  describe(`fromEntries`, () => {
    it(`should set repo from entries`, () => {
      const repo = {foo: `bar`, ergo: `dox`}
      const container = new Container().fromEntries(Object.entries(repo))

      expect(container.all()).toEqual(repo)
    })
  })

  describe(`getKeys`, () => {
    it(`should return array of keys`, () => {
      const repo = {key: `value`, anotherKey: `value`}
      const container = new Container(repo)

      expect(container.getKeys()).toEqual(Object.keys(repo))
    })
  })

  describe(`getValues`, () => {
    it(`should return array of values`, () => {
      const repo = {key: `value`, anotherKey: `value2`}
      const container = new Container(repo)

      expect(container.getValues()).toEqual(Object.values(repo))
    })
  })
})

export {}
