import {join, resolve} from 'path'
import {argv} from 'yargs'
import type {Loose} from '@roots/bud-typings'
import type {Container} from '../container'
type Directory = string
type Paths = Container

/**
 * Current working dir
 */
const cwd: Directory = process.cwd()

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../')

/**
 * Src arg
 */
const ensureStr: (any) => string = possibleStr =>
  (possibleStr as string) ? possibleStr : ''

/**
 * Paths repo.
 */
const paths: Loose = {
  repository: 'paths',
  contents: {
    cwd,
    project: cwd,
    framework,
    src: argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd),
    public: argv['public'] ? ensureStr(argv['public']) : '/',
    dist: argv['dist']
      ? join(cwd, ensureStr(argv['dist']))
      : join(cwd),
  },
}

export {paths}
export type {Directory, Paths}
