import React from 'react'
import {render} from 'ink'
import webpack from 'webpack'

import command from './cli/command'
import Budpack from './Budpack'
import budpackConfig from './config'

const mode = command?.input?.[0]

process.env.BABEL_ENV = mode == 'dev'
  ? 'development'
  : 'production'

process.env.NODE_ENV = mode == 'dev'
  ? 'development'
  : 'production'

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit()
})

const compiler = webpack(budpackConfig)

render(
  React.createElement(Budpack, {
    compiler,
    mode,
  })
)