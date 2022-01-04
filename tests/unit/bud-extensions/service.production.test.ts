import {Bud, factory} from '../../util/bud'

describe('Extensions', function () {
  let bud: Bud = null

  beforeAll(async () => {
    bud = await factory()
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    bud.hash()

    expect(bud.extensions.all()).toMatchSnapshot()

    bud.extensions.every((key, controller) => {
      expect(controller.meta).toMatchSnapshot()
    })
  })
})
