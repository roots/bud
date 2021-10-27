import {factory, Framework} from '@roots/bud'
import * as BudSassExtension from '@roots/bud-sass'

jest.setTimeout(20000)

describe('@roots/bud-sass', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('matches snapshot', () => {
    expect(BudSassExtension).toMatchSnapshot()
  })

  it('has @roots/bud-sass name', () => {
    expect(BudSassExtension.name).toBe('@roots/bud-sass')
  })

  it('exports a boot method', () => {
    expect(BudSassExtension.boot).toBeInstanceOf(Function)
  })
})
