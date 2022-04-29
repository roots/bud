import {factory} from '@roots/bud'

describe('bud', () => {
  it('name options', async () => {
    const bud = await factory({
      name: 'foo',
    })

    expect(bud.name).toBe('foo')
  })
})
