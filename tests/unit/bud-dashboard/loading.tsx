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

  it('renders loading indicator', () => {
    expect(dashboard.lastFrame()).toEqual('⠋ Loading')
  })
})
