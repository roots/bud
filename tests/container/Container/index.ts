import {Container} from '@roots/container'

describe('container', function () {
  describe('constructor', () => {
    it('is constructable', () => {
      const container = new Container()
      expect(container).toBeInstanceOf(Container)
    })
  })

  describe('get', function () {
    it('returns undefined when no value is set', () => {
      const container = new Container()
      expect(container.get('foo')).toEqual(undefined)
    })

    it('returns the keyed value', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.get('foo')).toBe('bar')
    })
  })

  describe('all', function () {
    it('returns the raw repository', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      expect(container.all()).toBe(repo)
    })
  })

  describe('set', function () {
    it('returns itself', () => {
      const container = new Container()

      expect(container.set('foo', 'bar')).toBeInstanceOf(
        Container,
      )
    })

    it('sets a value', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.get('foo')).toEqual('bar')
    })
  })

  describe('has', () => {
    it('returns true if item found', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.has('foo')).toEqual(true)
    })

    it('returns false if item not found', () => {
      const container = new Container().set('foo', 'bar')

      expect(container.has('neverSet')).toEqual(false)
    })
  })

  describe('is', function () {
    it('is: returns true if value equals predicate', () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is('test', 100)).toEqual(true)
    })

    it('is: returns false if value does not equal predicate', () => {
      const repo = {test: 100}
      const container = new Container(repo)

      expect(container.is('test', 'notIt')).toEqual(false)
    })
  })

  describe('isTrue', function () {
    it('returns true if keyed value is true', () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(true)
    })

    it('returns false if keyed value is false', () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(false)
    })

    it('returns false if keyed value is not boolean', () => {
      const repo = {test: 'bar'}
      const container = new Container(repo)

      expect(container.isTrue('test')).toEqual(false)
    })
  })

  describe('isFalse', function () {
    it('returns true if keyed value is false', () => {
      const repo = {test: false}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(true)
    })

    it('returns false if keyed value is true', () => {
      const repo = {test: true}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(false)
    })

    it('returns false if keyed value is not boolean', () => {
      const repo = {test: 'bar'}
      const container = new Container(repo)

      expect(container.isFalse('test')).toEqual(false)
    })
  })

  describe('set', function () {
    it('adds a value to the repository', () => {
      const repo = {foo: 'bar'}
      const container = new Container()

      expect(container.set('foo', 'bar').all()).toEqual(repo)
    })
  })

  describe('isArray', function () {
    it('returns true if value is an array', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isArray('foo')).toEqual(true)
    })
  })

  describe('isDefined', function () {
    it('returns true if value is set', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isDefined('foo')).toEqual(true)
    })

    it('returns false if value is not set', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isDefined('bar')).toEqual(false)
    })
  })

  describe('isNotArray', function () {
    it('returns true if value is not an array', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.isNotArray('foo')).toEqual(true)
    })
  })

  describe('isString', function () {
    it('returns true if value is a String', () => {
      const repo = {foo: 'bar'}
      const container = new Container(repo)

      expect(container.isString('foo')).toEqual(true)
    })
  })

  describe('isNotString', function () {
    it('returns true if value is a String', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isNotString('foo')).toEqual(true)
    })
  })

  describe('isNumber', function () {
    it('returns true if value is not a String', () => {
      const repo = {foo: 100}
      const container = new Container(repo)

      expect(container.isNumber('foo')).toEqual(true)
    })
  })

  describe('isNotNumber', function () {
    it('returns true if value is not a Number', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isNotNumber('foo')).toEqual(true)
    })
  })

  describe('isNull', function () {
    it('returns true if value is null', () => {
      const repo = {foo: null}
      const container = new Container(repo)

      expect(container.isNull('foo')).toEqual(true)
    })
  })

  describe('isNotNull', function () {
    it('returns true if value is not null', () => {
      const repo = {foo: ['bar', 'whiz']}
      const container = new Container(repo)

      expect(container.isNotNull('foo')).toEqual(true)
    })
  })

  describe('getMap', function () {
    it('returns an instance of Map', () => {
      const repo = {key: 'value', anotherKey: 'value2'}
      const container = new Container(repo)

      expect(container.getMap()).toBeInstanceOf(Map)
    })

    it('returns Map with expected structure', () => {
      const repo = {key: 'value', anotherKey: 'value2'}
      const container = new Container(repo)

      expect(Array.from(container.getMap())).toEqual([
        ['key', 'value'],
        ['anotherKey', 'value2'],
      ])
    })
  })

  describe('remove', () => {
    it('removes a value', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      container.remove('foo')

      expect(container.all()).toEqual({
        ergo: 'dox',
      })
    })
  })

  describe('setStore', () => {
    it('sets the value of the repository property', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      const replacement = {oof: 'yea', ben: 'word'}
      container.setStore(replacement)

      expect(container.all()).toEqual(replacement)
    })
  })

  describe('mutateStore', () => {
    it('callback receives the store value', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      container.mutateStore(store => {
        expect(store).toBe(repo)
        return store
      })
    })

    it('mutates the store using the provided callback', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      const mutagen = store => Object.assign(store, {foo: 'nea'})
      container.mutateStore(mutagen)

      expect(container.all()).toEqual({
        foo: 'nea',
        ergo: 'dox',
      })
    })
  })

  describe('each', () => {
    it('executes callback for each match', () => {
      const repo = {
        foo: {
          test: 'bar',
          ergo: 'dox',
        },
      }
      const container: Container = new Container(repo)

      const callback = jest.fn()
      container.each('foo', callback)

      expect(callback).toBeCalledTimes(2)
    })
  })

  describe('every', () => {
    it('executes callback for every top level key', () => {
      const repo = {
        foo: {
          test: 'bar',
          ergo: 'dox',
        },
      }
      const container: Container = new Container(repo)

      const callback = jest.fn()
      container.every(callback)

      expect(callback).toBeCalledTimes(1)
    })
  })

  describe('transform', () => {
    it('transforms a value using a callback', () => {
      const repo = {foo: 10}
      const container = new Container(repo)
      const result = container.transform('foo', v => {
        return v + 10
      })

      expect(result).toEqual(20)
    })
  })

  describe('mutate', () => {
    it('mutate a value using a callback', () => {
      const repo = {foo: 10}
      const container = new Container(repo)
      container.mutate('foo', v => {
        return v + 10
      })

      expect(container.get('foo')).toEqual(20)
    })
  })

  describe('mergeStore', () => {
    it('merges a value with the repository property', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      expect(
        container.mergeStore({crash: 'bandicoot'}).all(),
      ).toEqual({
        ...repo,
        crash: 'bandicoot',
      })
    })
  })

  describe('getEntries', () => {
    it('retrieves repo as entries', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container(repo)

      expect(container.getEntries()).toEqual([
        ['foo', 'bar'],
        ['ergo', 'dox'],
      ])
    })
  })

  describe('fromEntries', () => {
    it('sets repo from entries', () => {
      const repo = {foo: 'bar', ergo: 'dox'}
      const container = new Container().fromEntries(
        Object.entries(repo),
      )

      expect(container.all()).toEqual(repo)
    })
  })

  describe('findKey', () => {
    it('finds matching items', () => {
      const repo = {
        bud: {
          name: 'bud',
          type: 'tooling',
        },
        sage: {
          name: 'sage',
          type: 'theme',
        },
      }
      const container = new Container(repo)

      expect(
        container.findKey(({type}) => type == 'theme'),
      ).toEqual('sage')
    })
  })

  describe('findKeyIn', () => {
    it('finds matching nested items', () => {
      const repo = {
        deep: {
          name: 'bud',
          type: 'tooling',
          nested: {
            prop: {
              count: 8,
            },
            ergo: {
              count: 12,
            },
            dox: {
              count: undefined,
            },
          },
        },
      }
      const container = new Container(repo)

      expect(
        container.findKeyIn(
          'deep.nested',
          ({count}) => count > 10,
        ),
      ).toEqual('ergo')
    })
  })

  describe('getKeys', () => {
    it('returns array of keys', () => {
      const repo = {key: 'value', anotherKey: 'value'}
      const container = new Container(repo)

      expect(container.getKeys()).toEqual(Object.keys(repo))
    })
  })

  describe('getValues', () => {
    it('returns array of values', () => {
      const repo = {key: 'value', anotherKey: 'value2'}
      const container = new Container(repo)

      expect(container.getValues()).toEqual(Object.values(repo))
    })
  })
})

export {}
