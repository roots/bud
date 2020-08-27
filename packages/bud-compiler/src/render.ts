import webpack from 'webpack'
import React from 'react'
import {render as renderEl} from 'ink'
import {Dashboard} from './dashboard'

import type {BudRenderer} from './types'

const render: BudRenderer = (bud, config): void => {
  bud.compiler = webpack(config)

  const props = {bud}
  const application = React.createElement(Dashboard, props)

  renderEl(application)
}

export {render}
