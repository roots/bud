import {factory} from '@roots/bud'

describe('bud', () => {
  it('name options', async () => {
    const bud = await factory({
      label: 'foo',
    })

    expect(bud.label).toBe('foo')
  })
})
