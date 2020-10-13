/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')
const sass = require('../packages/extensions/sass')

bud.extensions.register('sass', sass)

bud.entry('foo', 'foo.js')

bud.compile()
