import {define} from '@roots/bud-api/src/Repository/define/index'

describe('bud.config', function () {
  const bud = new (class {
    public value = {}

    public extensions = {
      get: (key: string) => {
        return {
          options: {
            mergeStore: values => {
              this.value = {...this.value, ...values}
            },
            all: () => {
              return this.value
            },
          },
        }
      },
    }
  })()

  it('is a function', () => {
    expect(define).toBeInstanceOf(Function)
  })

  it('modifies bud.store', () => {
    define.bind(bud)({foo: 'bar'})

    expect(
      bud.extensions.get('webpack-define-plugin').options.all(),
    ).toEqual({foo: 'bar'})
  })
})
