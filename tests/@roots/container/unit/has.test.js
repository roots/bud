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
 * container.has
 */
describe('@roots/container', () => {
  describe('container.has', () => {
    it('should return true if data is present', () => {
      expect(new Container(data).has('name')).toEqual(true)
    })

    it('should return false if data is not present', () => {
      expect(new Container(data).has('notPresent')).toEqual(
        false,
      )
    })
  })
})
