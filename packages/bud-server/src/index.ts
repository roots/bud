import webpack from 'webpack'
import progressPlugin from './plugins/progress'
import builds from './builds'

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
}

export {compile as default}
