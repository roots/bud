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
})
