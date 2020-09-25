/**
 * @type {import('../bud').default} bud
 */
const bud = require('@roots/bud')

bud.bundle('app', ['index.js'])

bud.babel

bud.template({
  replacements: {
    APP_NAME: bud.package.get('name'),
    APP_DESCRIPTION: bud.package.get('description'),
    PUBLIC_URL: bud.env.get('PUBLIC_URL'),
  },
})

bud.extend

bud.when(
  bud.mode.is('development'),
  () => bud.dev({hot: true})
)

bud.compile()

/*
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
