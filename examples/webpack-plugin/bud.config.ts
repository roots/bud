import {bud} from '@roots/bud'

const {WebpackPlugin} = require('./WebpackPlugin.js')

/**
 * This is an example of how to use a Webpack plugin
 * with Bud. Bud will automatically register the plugin
 * with Webpack and apply it to the compilation.
 */
bud

  /**
   * Use a standard Webpack plugin as documented.
   */
  .use(new WebpackPlugin(console.log))

  /**
   * Use a webpack plugin which is defined inline.
   */
  .use({
    label: `inline-plugin`,
    apply: async () => {
      console.log('inline-plugin applied!')
      await bud.fs.write(
        bud.path(`@storage`, `inline-plugin-output`),
        `inline-plugin-test-success`,
      )
    },
  })

  /**
   * Use an array of plugins
   */
  .use([
    {
      label: `array-plugin-1`,
      apply() {
        console.log('array-plugin-1 applied!')
      },
    },
    new (class {
      public label = `array-plugin-2`
      public apply() {
        console.log('array-plugin-2 applied!')
      }
    })(),
  ])
