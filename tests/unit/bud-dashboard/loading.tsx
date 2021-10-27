import {factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

jest.setTimeout(20000)

describe.skip('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(async () => {
    bud = await factory()
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(done => {
    dashboard.cleanup()
    bud.close(done)
  })

  it('renders loading indicator', () => {
    expect(dashboard.lastFrame()).toContain(`⠋ Loading`)
  })
})
