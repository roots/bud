import React from 'react'
import {render as renderEl} from 'ink'
import Dashboard from './dashboard'

import type {BudRenderer} from './types'

const render: BudRenderer = (bud, config): void => {
  const application = React.createElement(Dashboard, {bud, config})

  renderEl(application)
}

export {render}
