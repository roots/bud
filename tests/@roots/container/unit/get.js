/**
 * container get
 */
module.exports = function () {
  describe('container.get', () => {
    it('returns requested data', () => {
      expect(this.container.get('name')).toEqual(this.data.name)
    })

    it('returns undefined if data is not present', () => {
      expect(this.container.get('notPresent')).toEqual(undefined)
    })

    it('returns data requested using dot notation', () => {
      expect(this.container.get('nested.data')).toEqual(
        this.data.nested.data,
      )
    })
  })
}
