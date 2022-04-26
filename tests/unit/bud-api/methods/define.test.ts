import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.define', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('adds definitions', async () => {
    await bud.api.call('define', {DEFINED_KEY: 'DEFINED_VALUE'})
    expect(
      bud.extensions.get('webpack:define-plugin').get('options')
        .DEFINED_KEY,
    ).toEqual('DEFINED_VALUE')
  })
})
