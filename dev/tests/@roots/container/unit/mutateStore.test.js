const {Container} = require('@roots/container')

const data = {
  0: 'test',
  name: 'Bud Co.',
  volume: Infinity,
  nested: {
    data: true,
  },
}

const mutation = store => ({
  ...store,
  name: store.name.toUpperCase(),
})

/**
 * container.mutateStore
 */
describe('@roots/container', () => {
  describe('container.mutateStore', () => {
    it('should mutate repository data', () => {
      expect(
        new Container(data).mutateStore(mutation).all(),
      ).toEqual(mutation(data))
    })
  })
})
