#!/usr/bin/env node
const cli = require('./../src/cli/signature')

const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const Budpack = importJsx('./../src/cli')

render(React.createElement(Budpack, {cli}))
