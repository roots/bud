import {factory, Framework} from '@roots/bud'

describe('Extensions', function () {
  let bud: Framework = null

  beforeAll(async () => {
    bud = await factory({
      config: {
        ci: true,
        log: false,
      },
    })
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })
})
