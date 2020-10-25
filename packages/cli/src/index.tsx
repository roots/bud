import React from 'react'
import {render} from 'ink'
import Compile from './Compile'
import Serve from './Serve'

const App = function (
  params: Framework.Index<Framework.Bud>,
): void {
  this.bud = params.bud

  this.run = function () {
    this.instance = this.bud.mode.is('development')
      ? render(<Serve bud={this.bud} />)
      : render(<Compile bud={this.bud} />)
  }

  this.kill = function () {
    this.instance.quit()
  }
}

export {App}
