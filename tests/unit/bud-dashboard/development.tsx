import {config, factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

jest.setTimeout(20000)

let BASIC_DIR = process.cwd().concat('/examples/basic')

let BASIC_CFG = {
  mode: 'development',
  config: {
    ...config,
    ci: true,
    location: {
      ...config.location,
      project: BASIC_DIR,
    },
  },
}

process.env.BUD_KEEP_ALIVE = 'true'

describe.skip('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: any
  let interval

  beforeAll(done => {
    bud = factory(BASIC_CFG)
    bud.compiler.compile().run(bud.compiler.callback)

    dashboard = Ink.render(<Components.Dashboard bud={bud} />)

    interval = setInterval(() => {
      if (
        bud.compiler.progress &&
        bud.compiler.progress[0] &&
        bud.compiler.progress[0] == 1
      ) {
        done()
      }
    }, 100)
  })

  afterAll(done => {
    dashboard.unmount()
    bud.close(done)
  })

  it('is in development mode', () => {
    clearInterval(interval)

    expect(bud.isDevelopment).toBe(true)
  })

  it('displays `Press Q to exit`', done => {
    expect(
      dashboard.lastFrame().includes('Press Q to exit'),
    ).toBe(true)

    done()
  })

  it('displays stats', done => {
    expect(dashboard.lastFrame().includes('- main.js')).toBe(
      true,
    )

    expect(dashboard.lastFrame().includes('Compiled in')).toBe(
      true,
    )

    done()
  })
})
