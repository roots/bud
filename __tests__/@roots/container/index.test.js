const {Container} = require('@roots/container')

const data = {
  0: 'test',
  name: 'Bud Co.',
  volume: Infinity,
  nested: {
    data: true,
  },
}

/**
 * @roots/container
 */
describe('@roots/container', () => {
  /**
   * Constructor
   */
  it('should set data passed in constructor', () => {
    const container = new Container(data)

    expect(container.repository).toEqual(data)
  })

  /**
   * container.all
   */
  describe('container.all', () => {
    it('should return repository', () => {
      const container = new Container(data)

      expect(container.all()).toEqual(data)
    })
  })

  /**
   * container.setStore
   */
  describe('container.setStore', () => {
    it('should set data to repository property', () => {
      const container = new Container()

      container.setStore(data)

      expect(container.repository).toEqual(data)
    })

    it('should overwrite repository property', () => {
      const container = new Container(data)

      container.setStore({
        overwrite: 'data',
      })

      expect(container.repository).toEqual({overwrite: 'data'})
    })
  })

  /**
   * container.mergeStore
   */
  describe('container.mergeStore', () => {
    it('should set data to repository property', () => {
      const container = new Container()

      container.setStore(data)

      expect(container.repository).toEqual(data)
    })

    it('should merge data into the repository property', () => {
      const container = new Container(data)
      const mergeData = {
        overwrite: false,
      }

      container.mergeStore(mergeData)

      expect(container.repository).toEqual({
        ...data,
        ...mergeData,
      })
    })
  })

  /**
   * container.transformStore
   */
  describe('container.transformStore', () => {
    it('should return transformed repository data', () => {
      const container = new Container(data)

      const transformFn = store => ({
        ...store,
        name: store.name.toUpperCase(),
      })

      const transformResult = container.transformStore(
        transformFn,
      )

      expect(transformResult).toEqual(transformFn(data))
    })
  })

  /**
   * container.mutateStore
   */
  describe('container.mutateStore', () => {
    it('should mutate repository data', () => {
      const container = new Container(data)

      const mutateFn = store => ({
        ...store,
        name: store.name.toUpperCase(),
      })

      container.mutateStore(mutateFn)

      expect(container.all()).toEqual(mutateFn(data))
    })
  })

  /**
   * container.has
   */
  describe('container.has', () => {
    it('should return true if data is present', () => {
      const container = new Container(data)

      const hasResult = container.has('name')

      expect(hasResult).toEqual(true)
    })

    it('should return false if data is not present', () => {
      const container = new Container(data)

      const hasResult = container.has('notPresent')

      expect(hasResult).toEqual(false)
    })
  })

  /**
   * container.get
   */
  describe('container.get', () => {
    it('should requested data', () => {
      const container = new Container(data)

      const getResult = container.get('name')

      expect(getResult).toEqual(data.name)
    })

    it('should return undefined if data is not present', () => {
      const container = new Container(data)

      const getResult = container.get('notPresent')

      expect(getResult).toEqual(undefined)
    })

    it('should work with dot notation', () => {
      const container = new Container(data)

      const getResult = container.get('nested.data')

      expect(getResult).toEqual(data.nested.data)
    })
  })

  /**
   * container.getEntries
   */
  describe('container.getEntries', () => {
    it('should get tuple form of requested data', () => {
      const container = new Container({
        some: {
          nested: 'key',
        },
      })

      const getEntriesResult = container.getEntries('some')

      expect(getEntriesResult).toEqual([['nested', 'key']])
    })

    it('should return an empty array if data is not present', () => {
      const container = new Container({
        some: {
          nested: 'key',
        },
      })

      const getEntriesResult = container.getEntries('notPresent')

      expect(getEntriesResult).toEqual([])
    })
  })
})
