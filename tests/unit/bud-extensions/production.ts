import {factory, Framework} from '@roots/bud'

describe('Extensions', function () {
  let bud: Framework = null

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('[production] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })
})
