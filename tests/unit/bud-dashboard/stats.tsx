import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'
import {join} from 'path'

import {Framework, setupBud, teardownBud} from '../../util'
import * as Ink from '../../util/ink'

process.env.BUD_KEEP_ALIVE = 'true'

jest.setTimeout(20000)

describe('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: any

  beforeAll(() => {
    bud = setupBud()
    bud.setPath(
      'project',
      join(process.cwd(), 'examples', 'basic'),
    )
    bud.compiler.compile().run(bud.compiler.callback)

    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(() => {
    dashboard.unmount()
    teardownBud(bud)
  })

  it('displays stats', done => {
    setTimeout(() => {
      expect(dashboard.lastFrame().includes(' - main.js')).toBe(
        true,
      )

      expect(dashboard.lastFrame().includes('Compiled in')).toBe(
        true,
      )

      done()
    }, 3000)
  })
})
