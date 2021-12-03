import {Bud, factory} from '@roots/bud'

describe('Extensions', function () {
  let bud: Bud = null

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    bud.hash()

    expect(bud.extensions.all()).toMatchSnapshot()

    bud.extensions.every((key, controller) => {
      expect(controller.options).toMatchSnapshot()
    })
  })
})
