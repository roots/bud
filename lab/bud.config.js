/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')
const sass = require('../packages/extensions/sass')

bud.extensions.registerExtension('sass', sass)

bud.entry('app', ['foo.js', 'foo.scss'])

bud.compile()
