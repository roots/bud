import {Bud, factory} from '../../util/bud'

describe('Extensions', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
    expect(bud.mode).toBe('development')
  })

  it('[development] bud.extensions.repository options matches snapshot', () => {
    expect(bud.extensions.getKeys().sort()).toMatchSnapshot()
  })
})
