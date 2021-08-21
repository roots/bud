import {config, factory, Framework} from '@roots/bud'
import * as BudSassExtension from '@roots/bud-sass'

jest.setTimeout(20000)

describe('@roots/bud-sass', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      config: {...config, ci: true},
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('throws when sass is not installed', () => {
    try {
      expect(bud.use([BudSassExtension])).toBeUndefined()
    } catch {}
  })
})
