import {Bud, factory} from '@roots/bud'

describe('Extensions', function () {
  let bud: Bud = null

  beforeAll(async () => {
    bud = await factory({
      config: {mode: 'development'},
    })
  })

  it('[development] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })
})
