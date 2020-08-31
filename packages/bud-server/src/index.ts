import webpack from 'webpack'
import progressPlugin from './plugins/progress'
import builds from './builds'
import globby from 'globby'

/**
 * @todo fix this fuckboi typing.
 */
export declare interface CompileOptions {
  bud: any
  mode: string
  progressCallback: (percentage: number, message: string) => void
  compilerCallback: (error: string, stats: any) => void
  expressCallback: any
}

/**
 * Compile builds.
 */
const compile = (options: CompileOptions): void => {
  const {bud, mode, progressCallback} = options

  builds[mode].before(options)

  bud.apply('compiler', webpack(bud.config(bud)))

  const progress = progressPlugin(progressCallback)
  progress.apply(bud.compiler)

  builds[mode].after(options)

  licenseTxtCleanup(bud)
}

const licenseTxtCleanup = bud => {
  const patterns = [
    bud.dist('*.LICENSE.txt'),
    bud.dist('**/*.LICENSE.txt'),
  ]

  bud.compiler.hooks.afterEmit.tap('bud-remove-license-txt', () => {
    globby.sync(patterns).forEach(match => {
      bud.fs.remove(match)
    })
  })
}

export {compile as default}
