import {Bud, factory} from '../../util/bud'

describe('Extensions', function () {
  let bud: Bud = null

  beforeAll(async () => {
    bud = await factory()
    expect(bud.mode).toBe('production')
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.getKeys().sort()).toMatchSnapshot()
  })
})
