import React from 'react'
import {render as renderEl} from 'ink'
import {Dashboard} from './dashboard'

import type {BudRenderer} from './types'

const render: BudRenderer = (bud): void => {
  const application = React.createElement(Dashboard, {bud})
  renderEl(application)
}

export {render}
