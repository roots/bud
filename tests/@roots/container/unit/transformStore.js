/**
 * container constructor
 */
module.exports = function () {
  const transform = store => ({
    ...store,
    name: store.name.toUpperCase(),
  })

  describe('container.transformStore', () => {
    it('should return transformed repository data', () => {
      expect(this.container.transformStore(transform)).toEqual(
        transform(this.data),
      )
    })
  })
}
