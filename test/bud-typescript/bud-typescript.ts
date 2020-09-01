const ava = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')
const {typescript} = require('@roots/bud-typescript')

bud.projectPath(process.cwd())

ava('extension includes bud object', t => {
  const extension = typescript(bud)
  t.is(extension.bud, bud)
})

ava('extension includes make function', t => {
  t.truthy(typeof typescript(bud).make === 'function')
})

bud.use([typescript])

ava('adds .ts support', t => {
  t.true(
    bud.options
      .get('webpack.resolve.extensions')
      .includes('.ts')
  )
})

ava('adds .tsx support', t => {
  t.true(
    bud.options
      .get('webpack.resolve.extensions')
      .includes('.tsx')
  )
})

ava('adds ts config', t => {
  t.deepEqual(
    bud.configs.get('typescript'),
    bud.project('tsconfig.json'),
  )
})

ava('applies an optional typescript method', t => {
  t.true(bud.hasOwnProperty('typescript'))
})

ava('typescript method configures typescript options', t => {
  bud.typescript({configFile: 'fubu'})
  t.deepEqual(bud.configs.get('typescript'), 'fubu')
})

ava('typescript method returns Bud object', t => {
  const returnValue = bud.typescript({
    configFile: bud.project('tsconfig.json'),
  })

  t.is(returnValue, bud)
})

/**
 * Ruleset
 */
const ruleFn = bud.rules.get('typescript')
const usesRule = ruleFn(bud)

ava('adds ts test', t => {
  t.deepEqual(bud.patterns.get('typescript'), /\.(ts|tsx)$/)
})

ava('adds ts test to ts rule', t => {
  t.deepEqual(usesRule.test, bud.patterns.get('typescript'))
})

ava('excludes node_modules from ts test', t => {
  t.deepEqual(usesRule.exclude, bud.patterns.get('vendor'))
})

/**
 * Ruleset => Use
 */
const expected = join(process.cwd(), 'packages/bud-typescript/node_modules/ts-loader/index.js')
const loaderFn = usesRule.use.pop()
const usesLoader = loaderFn(bud)

ava('adds typescript loader', t => {
  t.deepEqual(bud.loaders.get('typescript'), expected)
})

ava('uses ts-loader as loader', t => {
  t.deepEqual(usesLoader.loader, bud.loaders.get('typescript'))
})

ava('adds options to loader', t => {
  t.deepEqual(usesLoader.options.configFile, bud.configs.get('typescript'))
})
