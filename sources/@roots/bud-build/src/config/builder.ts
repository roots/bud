import type {Bud} from '@roots/bud-framework'
import {cpus} from 'os'
import type {Configuration} from 'webpack'

export {bail} from './bail.js'
export {cache} from './cache.js'
export {context} from './context.js'
export {devtool} from './devtool.js'
export {experiments} from './experiments.js'
export {infrastructureLogging} from './infrastructureLogging.js'
export {module} from './module.js'
export {optimization} from './optimization.js'
export {output} from './output.js'
export {resolve} from './resolve.js'

export interface ValueFactory<T extends keyof B, B = Configuration> {
  (app: Bud): Promise<B[T]>
}

export const entry: ValueFactory<`entry`> = async app =>
  app.hooks.filter(`build.entry`)

export const externals: ValueFactory<`externals`> = async app =>
  app.hooks.filter(`build.externals`)

export const externalsType: ValueFactory<`externalsType`> = async app =>
  app.hooks.filter(`build.externalsType`, `var`)

export const loader: ValueFactory<`loader`> = async app =>
  app.hooks.filter(`build.loader`)

export const mode: ValueFactory<`mode`> = async app =>
  app.hooks.filter(`build.mode`, app.mode)

export const name: ValueFactory<`name`> = async app =>
  app.hooks.filter(`build.name`, app.label)

export const node: ValueFactory<`node`> = async app =>
  app.hooks.filter(`build.node`, false)

export const parallelism: ValueFactory<`parallelism`> = async app =>
  app.hooks.filter(
    `build.parallelism`,
    10 * Math.max(cpus().length - 1, 1),
  )

export const performance: ValueFactory<`performance`> = async app =>
  app.hooks.filter(`build.performance`, {hints: false})

export const plugins: ValueFactory<`plugins`> = async app =>
  await app.extensions.make()

export const profile: ValueFactory<`profile`> = async app =>
  app.hooks.filter(`build.profile`)

export const recordsPath: ValueFactory<`recordsPath`> = async app =>
  app.hooks.filter(
    `build.recordsPath`,
    app.path(`@storage`, app.label, `modules.json`),
  )

export const stats: ValueFactory<`stats`> = async app =>
  app.hooks.filter(`build.stats`, {preset: `errors-only`})

export const target: ValueFactory<`target`> = async app =>
  app.hooks.filter(
    `build.target`,
    app.context.manifest?.browserslist
      ? `browserslist:${app.root.path(`package.json`)}`
      : `web`,
  )
