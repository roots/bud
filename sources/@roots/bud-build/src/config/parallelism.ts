import type {Factory} from '@roots/bud-build/config'

import {cpus} from 'node:os'

export const parallelism: Factory<`parallelism`> = async ({
  build,
  hooks,
  root,
}) => {
  const concurrency = 100
  const cores = Math.max(cpus().length, 1)

  const available = cores * concurrency
  const compilations = Math.max(Object.keys(root.children ?? []).length, 1)
  const parallelism = Math.max(Math.floor(available / compilations), 1)

  build.logger.info(`parallelism set to`, parallelism)
  return hooks.filter(`build.parallelism`, parallelism)
}
