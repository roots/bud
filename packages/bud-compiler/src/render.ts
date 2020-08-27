import webpack from 'webpack'
import React from 'react'
import {render as renderEl} from 'ink'
import {Dashboard} from './dashboard'
import {injectHot} from './injectHot'

import type {BudRenderer} from './types'

const render: BudRenderer = (bud, config): void => {
  bud.compiler = bud.features.enabled('hot')
    ? webpack(injectHot({config, bud}))
    : webpack(config)

  const props = {bud}
  const application = React.createElement(Dashboard, props)

  /** 🚀 */
  renderEl(application)
}

export {render}
