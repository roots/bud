import {join, resolve} from 'path'
import {argv} from 'yargs'

import type {
  Directory,
  RepositoryDefinition,
} from '@roots/bud-types'

/**
 * Current working dir
 */
const cwd: Directory = process.cwd()

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../')

/**
 * Paths repo.
 */
const paths: RepositoryDefinition = {
  name: 'paths',
  register: {
    cwd,
    project: cwd,
    framework,
    src: join(cwd, 'src'),
    public: '/',
    dist: join(cwd, 'dist'),
  },
}

export {paths}
