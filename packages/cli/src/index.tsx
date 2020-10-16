import React from 'react'
import {render} from 'ink'
import Compile from './Compile'
import Serve from './Serve'

const app: Dash.App = ({bud}) =>
  bud.mode.is('development')
    ? render(<Serve bud={bud} />)
    : render(<Compile bud={bud} />)

export default app
