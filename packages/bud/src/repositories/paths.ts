import {join, resolve} from 'path'
import {argv} from 'yargs'
import {projectRoot} from '../util/projectRoot'
import type {Directory} from './types'

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
const paths = {
  cwd,
  project: cwd,
  framework,
  src: argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd),
  dist: argv['dist'] ? join(cwd, ensureStr(argv['dist'])) : join(cwd),
  public: argv['public'] ? ensureStr(argv['public']) : '/',
}

export {paths}
