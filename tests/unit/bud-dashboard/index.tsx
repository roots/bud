import {Framework, setupBud, teardownBud} from '../../util'

describe('@roots/bud-dashboard', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    teardownBud(bud)
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
