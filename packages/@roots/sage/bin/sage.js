#!/usr/bin/env node

const budCLI = require('@roots/bud-cli').CLI

const sageCLI = new budCLI()

sageCLI.command = `sage`
sageCLI.projectUrl = `https://github.com/roots/sage`

sageCLI.heading().invoke()
