import {config, factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

process.env.BUD_KEEP_ALIVE = 'true'

jest.setTimeout(20000)

let BASIC_DIR = process.cwd().concat('/examples/basic')

let BASIC_CFG = {
  config: {
    ...config,
    ci: true,
    location: {
      ...config.location,
      project: BASIC_DIR,
    },
  },
}

describe.skip('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(done => {
    bud = factory(BASIC_CFG)

    bud.compiler.compile().run(bud.compiler.callback)

    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
    setTimeout(done, 2000)
  })

  afterAll(done => {
    dashboard.cleanup()
    bud.close(done)
  })

  it('displays stats', () => {
    expect(dashboard.lastFrame().includes(' - main.js')).toBe(
      true,
    )
  })

  it('displays timings', () => {
    expect(dashboard.lastFrame().includes('Compiled in')).toBe(
      true,
    )
  })
})
