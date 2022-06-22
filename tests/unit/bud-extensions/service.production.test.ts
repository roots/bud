import {Bud, factory} from '@repo/test-kit/bud'

describe('Extensions', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    expect(bud.mode).toBe('production')
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    expect(Object.keys(bud.extensions.repository).sort()).toMatchSnapshot()
  })
})
