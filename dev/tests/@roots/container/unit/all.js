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
   * container.all
   */
  describe('container.all', () => {
    it('should return repository', () => {
      const container = new Container(data)
      expect(container.all()).toEqual(data)
    })
  })
})
