import {BudDllPluginConstructor} from '@roots/bud-library/src/BudDllPlugin'

describe('@roots/bud-library', () => {
  let mockBud = {
    path: jest.fn((path: string) => 'JEST_MOCK_PATH'),
  }

  describe('BudDllPluginConstructor', () => {
    it('has name prop', () => {
      expect(BudDllPluginConstructor).toBeInstanceOf(Function)
    })

    it('returns a labeled extension', () => {
      const result = BudDllPluginConstructor(['react'])
      expect(result.label).toBe('autodll-webpack-plugin')
    })

    it('returns a makeable extension', () => {
      const result = BudDllPluginConstructor(['react'])
      expect(result.make).toBeInstanceOf(Function)
    })

    describe('options', () => {
      it('expressed as fn', () => {
        const result = BudDllPluginConstructor(['react'])
        expect(result.options).toBeInstanceOf(Function)
      })

      it('returns library options obj', () => {
        const result = BudDllPluginConstructor(['react'])
        expect(result.options(mockBud)).toStrictEqual({
          debug: false,
          inject: false,
          filename: 'JEST_MOCK_PATH',
          entry: {
            library: ['react'],
          },
          path: 'dll',
          inherit: false,
          context: 'JEST_MOCK_PATH',
        })
      })
    })
  })
})
