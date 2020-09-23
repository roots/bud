// eslint-disable-next-line @typescript-eslint/no-var-requires
const bud = require('@roots/bud')
bud.bundle('app', ['index.js'])
bud.template({
  replacements: {
    APP_NAME: bud.package.get('name'),
    APP_DESCRIPTION: bud.package.get('description'),
    PUBLIC_URL: bud.env.get('PUBLIC_URL'),
  },
})
bud.compile()
