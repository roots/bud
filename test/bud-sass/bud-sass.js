const ava = require('ava')
const {bud} = require('@roots/bud')
const {sass} = require('@roots/bud-sass')

ava('exists', t => {
  t.truthy(sass)
})

bud.use([sass])

ava('adds .scss support', t => {
  t.true(
    bud.options
      .get('webpack.resolve.extensions')
      .includes('.scss')
  )
})

ava('adds .sass support', t => {
  t.true(
    bud.options
      .get('webpack.resolve.extensions')
      .includes('.sass')
  )
})

ava('adds sass options', t => {
  t.deepEqual(bud.options.get('sass'), {sourceMap: true})
})

ava('adds sass loader', t => {
  t.deepEqual(
    bud.rules.entries().pop()(bud).use.pop().loader,
    require.resolve('sass-loader'),
  )
})

ava('applies an optional sass method', t => {
  t.true(
    bud.hasOwnProperty('sass')
  )
})

ava('sass method configures sass options', t => {
  bud.sass({sourceMap: false})

  t.deepEqual(bud.options.get('sass'), {
    sourceMap: false,
  })
})
