import {config, factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

jest.setTimeout(20000)

process.env.BUD_KEEP_ALIVE = 'true'

describe.skip('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(done => {
    bud = factory({config: {...config, ci: true}})
    bud.compiler.compile().run(bud.compiler.callback)
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
    setTimeout(done, 2000)
  })

  afterAll(done => {
    bud.close(() => {
      dashboard.cleanup()
      done()
    })
  })

  it('displays an error', () => {
    expect(
      dashboard
        .lastFrame()
        .includes(
          "Module not found: Error: Can't resolve './src'",
        ),
    ).toBe(true)
  })
})
