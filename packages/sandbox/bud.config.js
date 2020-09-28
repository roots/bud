/* eslint-disable */

/**
 * @type {import('../bud-types').default} bud
 * @namespace {import('../bud-types).Bud}
 */
const bud = require('@roots/bud')

bud.postPluginAdd({
  astroturf: [require('astroturf')],
})

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
