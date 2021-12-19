const {factory} = require('@roots/bud')

module.exports = async env => {
  const bud = await factory({
    config: {
      mode: env.production ? 'production' : 'development',
    },
  })

  bud.entry('app', 'index.js').minimize().splitChunks()

  return await bud.compiler.precompile()
}
