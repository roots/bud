import {define} from '@roots/bud-api/src/Repository/define'
import {Store} from '@roots/bud-framework'

describe('bud.config', function () {
  const definition = {foo: 'bar'}
  const all = jest.fn(() => definition)
  const get = (name: string) => {
    let store = {}
    return {
      options: {
        all: () => store,
        mergeStore: values => {
          store = values
        },
      },
    }
  }

  const bud = {
    extensions: {
      get: jest.fn(get),
    },
  }

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
