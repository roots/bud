import webpack from 'webpack'
import progressPlugin from './plugins/progress'
import builds from './builds'
import {Bud} from '@roots/bud-types'

/**
 * @todo fix this fuckboi typing.
 */
export declare interface CompileOptions {
  bud: Bud
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

  progressPlugin(progressCallback).apply(bud.compiler)

  builds[mode].after(options)
}

export {compile as default}
