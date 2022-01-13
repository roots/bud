#!/usr/bin/env node

const {run, flush, Errors} = require('@oclif/core')

run().then(flush).catch(Errors.handle)
