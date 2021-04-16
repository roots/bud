/**
 * container constructor
 */
module.exports = function () {
  describe('container.constructor', () => {
    it('should set data passed in constructor', () => {
      expect(this.container.repository).toEqual(this.data)
    })
  })
}
