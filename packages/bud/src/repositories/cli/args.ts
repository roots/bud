import {argv} from 'yargs'
import type {RepositoryDefinition} from '@roots/bud-types'

const args: RepositoryDefinition = {
  name: 'args',
  register: {
    mode: argv['env'] ?? 'none',
    host: argv['host'] ?? false,
    port: argv['port'] ?? null,
    proxy: argv['proxy'] ?? null,
    src: argv['src'] ?? null,
    dist: argv['dist'] ?? null,
    feature: argv['feature'] ?? null,
  },
}

export {args}
