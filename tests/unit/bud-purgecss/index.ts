import {factory, Framework} from '@roots/bud'
import * as BudPurgeCssExtension from '@roots/bud-purgecss'

describe('@roots/bud-purgecss', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
    bud.use([BudPurgeCssExtension])
  })

  afterAll(done => {
    bud.close(done)
  })

  test.todo('test @roots/bud-purgecss')
})
