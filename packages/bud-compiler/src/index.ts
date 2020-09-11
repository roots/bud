import React from 'react'
import {render} from 'ink'
import Dashboard from './dashboard'

import {BudCompiler as Compiler} from '@roots/bud-types'

const compiler: Compiler.Factory = (bud, config) => ({
  bud,
  config,
  compile: function () {
    renderCli(this.bud, this.config)
  },
})

const renderCli: Compiler.Renderer = (bud, config) => {
  render(React.createElement(Dashboard, {bud, config}))
}

export {compiler as default}
