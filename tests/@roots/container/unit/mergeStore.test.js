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
})
