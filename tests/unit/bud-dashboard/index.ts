import {Framework, setupBud, teardownBud} from '../../util'

describe('@roots/bud-dashboard', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('development')
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('exists', () => {
    expect(bud.dashboard).toBeDefined()
  })

  it('has a service name of `dashboard`', () => {
    expect(bud.dashboard.name).toBe('dashboard')
  })
})
