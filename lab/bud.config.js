// @ts-check

const localFix = require('./localFix')
const snippets = require('./snippets')

/** @type {{bud: import('../packages/bud/lib/types/Bud').Bud}}  */
const {bud} = require('@roots/bud')

bud.pipe([
  localFix,
  ({use}) =>
    use([
      '@roots/bud-postcss',
      '@roots/bud-babel',
      '@roots/bud-react',
    ]),
  ({buildCache}) => buildCache(),
  ({entry}) => entry('foo', ['foo.js', 'foo.css']),
  ({minify}) => minify(),
  ({run}) => run(),
])
