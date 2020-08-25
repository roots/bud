const test = require('ava')
const {bud} = require('@roots/bud')

test('has property: util', t => t.true(bud.util.hasOwnProperty('notify')))
