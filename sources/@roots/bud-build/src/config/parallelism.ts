import {cpus} from 'node:os'

import type {Factory} from './index.js'

export const parallelism: Factory<`parallelism`> = async ({hooks}) =>
  hooks.filter(`build.parallelism`, 10 * Math.max(cpus().length - 1, 1))
