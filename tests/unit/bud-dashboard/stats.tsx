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
    location: {
      ...config.location,
      project: BASIC_DIR,
    },
  },
}

describe('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(() => {
    bud = factory(BASIC_CFG)

    bud.compiler.compile().run(bud.compiler.callback)

    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(() => {
    dashboard.cleanup()
  })

  it('displays stats', done => {
    setTimeout(() => {
      expect(dashboard.lastFrame().includes(' - main.js')).toBe(
        true,
      )

      done()
    }, 1000)
  })

  it('displays timings', done => {
    setTimeout(() => {
      expect(dashboard.lastFrame().includes('Compiled in')).toBe(
        true,
      )

      done()
    }, 1000)
  })
})
