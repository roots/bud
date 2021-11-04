import {factory, Framework} from '@roots/bud'

describe('Extensions', function () {
  let bud: Framework = null

  beforeAll(async () => {
    bud = await factory({
      mode: 'development',
    })
    bud
  })

  it('[development] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })
})
