import {factory} from '@roots/bud-library/factory'

describe('@roots/bud-library', () => {
  describe('Constructor', () => {
    it('has name prop', () => {
      expect(factory).toBeInstanceOf(Function)
    })

    it('returns a labeled extension', () => {
      const result = factory(['react'])
      expect(result.label).toBe('autodll-webpack-plugin')
    })

    it('returns a makeable extension', () => {
      const result = factory(['react'])
      expect(result.plugin).toBeInstanceOf(Function)
    })

    describe('options', () => {
      it('returns library options obj', () => {
        const result = factory(['react'])
        expect(result.options).toStrictEqual({
          debug: false,
          inject: false,
          entry: {
            library: ['react'],
          },
          path: 'dll',
          inherit: false,
        })
      })
    })
  })
})
