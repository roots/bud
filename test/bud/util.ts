const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

test('has property: util', t => t.true(bud.util.hasOwnProperty('notify')))
