import {factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

process.env.BUD_KEEP_ALIVE = 'true'

jest.setTimeout(20000)

describe('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(() => {
    bud = factory()
  })

  afterAll(() => {
    dashboard.cleanup()
  })

  it('renders loading indicator', () => {
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
    expect(dashboard.lastFrame()).toContain(`⠋ Loading`)
  })
})
