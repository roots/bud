import {Container} from '@roots/container'

describe('container', function () {
  it('is constructable', () => {
    const container = new Container()
    expect(container).toBeInstanceOf(Container)
  })

  it('get: returns undefined when no value is set', () => {
    const container = new Container()
    expect(container.get('foo')).toEqual(undefined)
  })

  it('get: returns a value', () => {
    const repo = {foo: 'bar'}
    const container = new Container(repo)

    expect(container.get('foo')).toBe('bar')
  })

  it('all: returns repo', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container(repo)

    expect(container.all()).toBe(repo)
  })

  it('set: returns itself', () => {
    const container = new Container()

    expect(container.set('foo', 'bar')).toBeInstanceOf(Container)
  })

  it('set: sets a value', () => {
    const container = new Container().set('foo', 'bar')

    expect(container.get('foo')).toEqual('bar')
  })

  it('has: returns true if item found', () => {
    const container = new Container().set('foo', 'bar')

    expect(container.has('foo')).toEqual(true)
  })

  it('has: returns false if item not found', () => {
    const container = new Container().set('foo', 'bar')

    expect(container.has('neverSet')).toEqual(false)
  })

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

  it('set: adds a value to the repository', () => {
    const repo = {
      foo: 'bar',
    }
    const container = new Container()

    expect(container.set('foo', 'bar').all()).toEqual(repo)
  })

  it('remove: removes a value', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container(repo)

    container.remove('foo')

    expect(container.all()).toEqual({
      ergo: 'dox',
    })
  })

  it('setStore: sets the repo value', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container(repo)

    const replacement = {
      oof: 'yea',
      ben: 'word',
    }
    container.setStore(replacement)

    expect(container.all()).toEqual(replacement)
  })

  it('mergeStore: merges a value', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container(repo)

    expect(
      container.mergeStore({crash: 'bandicoot'}).all(),
    ).toEqual({
      ...repo,
      crash: 'bandicoot',
    })
  })

  it('getEntries: retrieves repo as entries', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container(repo)

    expect(container.getEntries()).toEqual([
      ['foo', 'bar'],
      ['ergo', 'dox'],
    ])
  })

  it('fromEntries: sets repo from entries', () => {
    const repo = {
      foo: 'bar',
      ergo: 'dox',
    }
    const container = new Container().fromEntries(
      Object.entries(repo),
    )

    expect(container.all()).toEqual(repo)
  })

  it('findKey: finds matching items', () => {
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

  it('findKeyIn: finds matching nested items', () => {
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

export {}
