import {cpus} from 'node:os'

import type {Factory} from './index.js'

export const parallelism: Factory<`parallelism`> = async ({
  hooks,
  root,
}) => {
  const factor = 10
  const procs = Math.min(cpus().length - 1, 1)
  const comps = root.hasChildren
    ? Math.min(Object.keys(root.children).length)
    : 1

  return hooks.filter(`build.parallelism`, (procs * factor) / comps)
}
