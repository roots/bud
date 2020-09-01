const {bud} = require('@roots/bud')
const ava = require('ava')

ava('Bud has server property', t => {
  t.true(bud.hasOwnProperty('server'))
})
