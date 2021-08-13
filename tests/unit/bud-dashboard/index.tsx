import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import {Framework, setupBud, teardownBud} from '../../util'
import * as Ink from '../../util/ink'

process.env.BUD_KEEP_ALIVE = 'true'

jest.setTimeout(20000)

describe('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: any

  beforeAll(() => {
    bud = setupBud()
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(() => {
    dashboard.unmount()
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

  it('renders loading indicator', () => {
    expect(dashboard.lastFrame()).toEqual('⠋ Loading')
  })

  it('displays an error', done => {
    bud.compiler.compile().run(bud.compiler.callback)

    setTimeout(() => {
      expect(
        dashboard
          .lastFrame()
          .includes(
            "Module not found: Error: Can't resolve './src'",
          ),
      ).toBe(true)

      done()
    }, 3000)
  })
})
