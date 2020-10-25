const bud = require('../packages/bud/lib')


bud
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()

console.log(bud.build.make().module.rules[0].oneOf)
