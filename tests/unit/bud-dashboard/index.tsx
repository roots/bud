import {config, factory, Framework} from '@roots/bud'

describe.skip('@roots/bud-dashboard', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('exists', () => {
    expect(bud.dashboard).toBeDefined()
  })

  it('has a service name of `dashboard`', () => {
    expect(bud.dashboard.name).toBe('dashboard')
  })

  it('has a run method', () => {
    expect(bud.dashboard.run).toBeInstanceOf(Function)
  })
})
