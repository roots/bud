#!/usr/bin/env node

const tsnode = require('ts-node')
const {run, flush, Errors} = require('@oclif/core')

tsnode.register({ transpileOnly: true })
run().then(flush).catch(Errors.handle)
