module.exports = async () => {
  return await import(`@roots/bud/factory`)
    .then(async ({factory}) => await factory())
    .then(async bud => bud.hooks.on(`build.stats`, `detailed`))
    .then(async bud => await bud.build.make())
}
