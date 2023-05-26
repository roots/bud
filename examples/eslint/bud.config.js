export default async bud => {
  bud.entry('app', 'app.js')

  bud.eslint
    .setFix(true)
    .setFailOnWarning(false)
    .setFailOnError(bud.isProduction)
}
