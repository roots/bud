import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'
import {join} from 'path'

import {Framework, setupBud, teardownBud} from '../../util'
import * as Ink from '../../util/ink'

process.env.BUD_KEEP_ALIVE = null

jest.setTimeout(10000)

describe('@roots/bud-dashboard', function () {
  let bud: Framework
  let dashboard: Ink.Instance

  beforeAll(() => {
    bud = setupBud('development')
    bud.setPath(
      'project',
      join(process.cwd(), 'examples', 'basic'),
    )

    bud.run()
  })

  afterAll(() => {
    bud = teardownBud(bud)
    dashboard.unmount()
  })

  it('displays `Press Q to exit`', done => {
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)

    setTimeout(() => {
      expect(
        dashboard.lastFrame().includes('Press Q to exit'),
      ).toBe(true)

      done()
    }, 2000)
  })
})
