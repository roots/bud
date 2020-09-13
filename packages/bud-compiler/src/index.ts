import React from 'react'
import {render} from 'ink'
import Dashboard from './dashboard'
import compile from '@roots/bud-server'

import {BudCompiler as Compiler} from '@roots/bud-types'

const compiler: Compiler.Factory = (
  bud,
  config,
  progressMessage = '',
) => ({
  bud,
  config,
  name: bud.fs.readJsonSync('package.json')?.name,
  progressMessage,

  progressCallback: function (number, message) {
    if (this.progressMessage !== message) {
      this.progressMessage = message
      console.log(`[${this.name}] ${this.progressMessage}`)
    }
  },
  compile: function () {
    this.progressCallback = this.progressCallback.bind(this)

    this.bud.args.get('ci')
      ? compile({
          bud: this.bud,
          mode: bud.mode.get(),
          compilerCallback: () => null,
          expressCallback: () => null,
          progressCallback: this.progressCallback,
        })
      : renderCli(this.bud, this.config)
  },
})

const renderCli: Compiler.Renderer = (bud, config) => {
  render(React.createElement(Dashboard, {bud, config}))
}

export {compiler as default}
