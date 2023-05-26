export default async bud => {
  bud.entry('app', ['app.js', 'app.css'])

  /**
   * Stylelint configuration
   */
  bud.stylelint
    .setFix(true)
    .setStylelintPath(await bud.module.resolve('stylelint'))
    .setCache(true)
    .setConfig(config => ({
      ...config,
      rules: {
        // define or augment config here if preferred
      },
    }))
}
