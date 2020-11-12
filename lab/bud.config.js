/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')

bud.use(['@roots/bud-babel', '@roots/bud-react'])

bud.library(['react', 'react-dom'])

bud
  .buildCache()
  .entry('foo', ['foo.js', 'foo.css'])
  .minify()
  .run()
