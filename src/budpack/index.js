import React from 'react'
import {render} from 'ink'
import webpack from 'webpack'

import command from './cli/command'
import Budpack from './Budpack'
import budpackConfig from './config'

render(
  React.createElement(Budpack, {
    compiler: webpack(budpackConfig()),
    cli: command,
  })
)
