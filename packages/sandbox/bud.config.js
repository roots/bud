/* eslint-disable */

/** @type {import('../bud').default} bud */
const {
  loaders,
  options,
  rules,
  terminate,
} = require('@roots/bud')

loaders.each(({ident, options}, id) => {
  console.log({[ident ?? id]: options})
})

rules.each(rule => {
  console.log(rule.get().test)
})

loaders.set('postcss.ident', '😺')

const {presets, plugins} = loaders.get('babel.options')
loaders.merge('babel.options', {presets, plugins})

options.merge('postcss.plugins', 'bruu.')

console.log(
  presets ===
    require('@roots/bud').loaders.get('babel.options.presets'),
)

terminate()

/*
bud.bundle('app', ['index.js'])

bud.template({
  replacements: {
    APP_NAME: bud.package.get('name'),
    APP_DESCRIPTION: bud.package.get('description'),
    PUBLIC_URL: bud.env.get('PUBLIC_URL'),
  },
})

bud.when(
  bud.mode.is('development'),
  () => bud.dev({hot: true}),
  () => bud.minify(),
)

bud.compile() */

/** @param {import('../bud').default} bud */
/**
module.exports = (bud) => {
  bud.bundle('app', ['index.js'])

  bud.template({
    replacements: {
      APP_NAME: bud.package.get('name'),
      APP_DESCRIPTION: bud.package.get('description'),
      PUBLIC_URL: bud.env.get('PUBLIC_URL'),
    },
  })

  bud.when(
    bud.mode.is('development'),
    () => bud.dev({hot: true})
  )

  return bud
}

 */
