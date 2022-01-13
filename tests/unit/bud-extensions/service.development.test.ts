import {Bud, factory} from '../../util/bud'

describe('Extensions', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    expect(bud.mode).toBe('development')
  })

  it('[development] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })

  it('[development] bud.extensions.repository options matches snapshot', () => {
    bud.extensions.every((key, controller) => {
      expect(controller.meta).toMatchSnapshot()
    })
  })
})
