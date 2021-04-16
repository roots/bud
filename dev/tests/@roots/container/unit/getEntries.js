/**
 * container get
 */
module.exports = function () {
  describe('container.getEntries', () => {
    it('should return tuple form of requested data', () => {
      expect(this.container.getEntries('nested')).toEqual(
        Object.entries(this.data.nested),
      )
    })

    it('should return an empty array if data is not present', () => {
      expect(this.container.getEntries('notPresent')).toEqual(
        Object.entries([]),
      )
    })
  })
}
