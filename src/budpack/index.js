import {join} from 'path'
import React from 'react'
import {render} from 'ink'
import importJsx from 'import-jsx'
import webpack from 'webpack'
import config from './config'

const mode = 'development'

process.env.BABEL_ENV = mode
process.env.NODE_ENV = mode
process.on('unhandledRejection', err => {
  console.error(err)
  process.exit()
})

const Budpack = importJsx('./Budpack')
const project = require(join(process.cwd(), 'bud.config.js'))
const compiler = webpack(config(project))

render(React.createElement(Budpack, {compiler, mode}))
