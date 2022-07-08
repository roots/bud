import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import c from 'chalk'
import {isUndefined} from 'lodash-es'

@label('@roots/bud-preset-wordpress/browserslist-check')
export default class BudBrowsersListCheck extends Extension {
  public items: Array<string> = []

  @bind
  public async beforeBuild() {
    if (!this.app.context.manifest.browserslist) return

    this.app.context.manifest.browserslist?.production &&
      this.items.push(...this.app.context.manifest.browserslist.production)

    this.app.context.manifest.browserslist?.development &&
      this.items.push(
        ...this.app.context.manifest.browserslist.development,
      )

    Array.isArray(this.app.context.manifest.browserslist) &&
      this.items.push(...this.app.context.manifest.browserslist)

    if (
      this.items.some(item =>
        item.endsWith('@wordpress/browserslist-config'),
      )
    ) {
      try {
        await this.import('@wordpress/browserslist-config')
      } catch (e) {
        this.app.context.stdout.write(`
${c.red.bold(
  `\`@wordpress/browserslist-config\` is specified in \`package.json\` but it is not resolvable.`,
)}

│ Either replace it with \`@roots/browserslist-config\` or install \`@wordpress/browserslist-config\` as a project dependency.
│ Since it was removed from bud.js in v6.2.1 is no longer provided for you by any of your dependencies.
│
│ This check was provided as a courtesy, and will be removed in the future.
│ At that point your project will encounter build errors unless you take action.
│
├──  🩹 Setting the compiler build target to \`web\`
`)

        this.app.hooks.on('build.target', 'web')

        if (this.app.extensions.has('@roots/bud-postcss')) {
          const postcss: any = this.app.extensions.get(
            '@roots/bud-postcss',
          )
          if (postcss.plugins.has('env')) {
            this.app.context.stdout.write(`\
│
├──  🩹 Setting \`postcss-preset-env\` \`browsers\` target to '>%1'
`)
            postcss.setPluginOptions('env', options => ({
              ...(options ?? {}),
              browsers: '>1%',
            }))
          }
        }

        if (this.app.extensions.has('@roots/bud-babel')) {
          const babel: any = (this.app as any).babel
          if (!isUndefined(babel.presets['@babel/preset-env'])) {
            this.app.context.stdout.write(`\
│
├──  🩹 Setting \`@babel/preset-env\` \`browsers\` target to '>%1'
`)
            babel.setPresetOptions('@babel/preset-env', {
              targets: ['>1%'],
            })
          }

          this.app.context.stdout.write(`\
│
├──  🩹 Setting babel \`browsers\` target to '>%1'
`)

          this.app.build.items.babel.setOptions({
            cacheDirectory: babel.cacheDirectory,
            presets: Object.values(babel.presets),
            plugins: Object.values(babel.plugins),
            env: babel.env,
            root: babel.root,
            targets: ['>1%'],
          })
        }

        this.app.context.stdout.write(`\
│
└── https://bud.js.org/blog/6.2.1


`)
      }
    }
  }
}
