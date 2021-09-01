import {factory, Framework} from '@roots/bud'

describe('Extensions', function () {
  let bud: Framework = null

  beforeAll(() => {
    bud = factory({
      mode: 'development',
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('[development] bud.extensions.repository matches snapshot', () => {
    expect(bud.extensions.all()).toMatchSnapshot()
  })
})
