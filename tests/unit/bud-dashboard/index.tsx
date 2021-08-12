import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'
import {join} from 'path'

import {Framework, setupBud, teardownBud} from '../../util'
import * as Ink from '../../util/ink'

describe('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: Ink.Instance

  beforeAll(() => {
    bud = setupBud()
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(() => {
    bud = teardownBud(bud)
    dashboard.unmount()
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
    expect(dashboard.frames.pop()).toEqual('⠋ Loading')
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
  }, 10000)

  it('displays stats', done => {
    bud.setPath(
      'project',
      join(process.cwd(), 'examples', 'basic'),
    )
    bud.build.rebuild()
    bud.compiler.compile().run(bud.compiler.callback)

    dashboard.rerender(<Components.Dashboard bud={bud} />)

    setTimeout(() => {
      expect(dashboard.lastFrame().includes(' - main.js')).toBe(
        true,
      )

      expect(dashboard.lastFrame().includes('Compiled in')).toBe(
        true,
      )

      done()
    }, 3000)
  }, 10000)
})
