import {Bud, factory} from '@roots/bud'
import {Extension} from '@roots/bud-framework'

describe('bud', () => {
  it('name options', async () => {
    const bud = await factory({
      name: 'foo',
    })

    expect(bud.name).toBe('foo')
  })
  it('extensions options', async () => {
    class mockExt extends Extension {
      public label = 'foo'
    }

    const bud = await factory({
      extensions: [mockExt],
    })

    expect(Object.keys(bud.extensions.repository)).toHaveLength(1)
    expect(bud.extensions.repository.foo).toBeInstanceOf(mockExt)
  })
})
