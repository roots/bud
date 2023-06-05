import type {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  /**
   * Register global styles
   *
   * @remarks
   * This is a helper wrapping the `bud.sass.setAdditionalData` method.
   */
  bud.sass.registerGlobal([
    `$cream: #FFFDD0;`,
    `$orange: #FF6600;`,
    `$lavender: #E6E6FA;`,
    `$coral: #E2725B;`,
    `$green: #88B04B;`,
  ])

  /**
   * This also wraps `bud.sass.setAdditionalData`
   * but is convenient for including an entire module.
   */
  bud.sass.importGlobal(`globals.scss`)

  /**
   * General configuration
   */
  bud.sass
    .setImplementation(`sass`)
    .setSourceMap(true)
    .setAdditionalData(str => [str, `$blue: #92A8D1;`].join(`\n`))
    .setWarnRuleAsWarning(false)

  // node-sass & lib-sass options
  // are not exposed by the bud.sass api
  // so you'll want to use bud.sass.setOptions.
  //
  // bud.sass.setOptions({
  //  implementation: `node-sass`,
  //  webpackImporter: false,
  //  sassOptions: {
  //    verbose: false,
  //  },
  // })
}
