import {join, resolve} from 'path'
import {argv} from 'yargs'
import {projectRoot} from '../util/projectRoot'
import type {Directory} from './types'

/**
 * Current working dir
 */
const cwd: Directory = process.cwd()

/**
 * Project directory.
 */
const project: Directory = projectRoot

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../')

/**
 * Src arg
 */
const srcArg: any = argv.src

const paths = {
  cwd,
  project: cwd,
  framework,
  src: srcArg && typeof srcArg == 'string' ? join(cwd, srcArg) : join(cwd),
  dist: argv?.dist ?? project,
  public: argv?.public ?? '/',
}

export {paths}
