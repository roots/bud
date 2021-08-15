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
    location: {
      ...config.location,
      project: BASIC_DIR,
    },
  },
}

process.env.BUD_KEEP_ALIVE = 'true'

describe('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: any

  beforeAll(done => {
    bud = factory(BASIC_CFG)
    bud.compiler.compile().run(bud.compiler.callback)

    dashboard = Ink.render(<Components.Dashboard bud={bud} />)

    done()
  })

  afterAll(() => {
    dashboard.cleanup()
  })

  it('is in development mode', () => {
    expect(bud.isDevelopment).toBe(true)
  })

  it('displays `Press Q to exit`', done => {
    setTimeout(() => {
      expect(
        dashboard.lastFrame().includes('Press Q to exit'),
      ).toBe(true)

      done()
    }, 1000)
  })

  it('displays stats', done => {
    setTimeout(() => {
      expect(dashboard.lastFrame().includes('- main.js')).toBe(
        true,
      )

      expect(dashboard.lastFrame().includes('Compiled in')).toBe(
        true,
      )

      done()
    }, 1000)
  })
})
