import React from 'react'
import {render} from 'ink'
import Compile from './Compile'
import Serve from './Serve'

export const App: Framework.CLI.Factory = (
  bud: Framework.Bud,
) => ({
  bud,
  run() {
    this.instance = this.bud.mode.is('development')
      ? render(<Serve bud={this.bud} />)
      : render(<Compile bud={this.bud} />)
  },
  kill() {
    this.instance.quit()
  },
})
