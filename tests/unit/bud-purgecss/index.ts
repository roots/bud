import {factory, Framework} from '@roots/bud'
import * as BudPurgeCssExtension from '@roots/bud-purgecss'

describe('@roots/bud-purgecss', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory()
    bud.use([BudPurgeCssExtension])
  })

  afterAll(done => {
    bud.close(done)
  })

  test.todo('test @roots/bud-purgecss')
})
