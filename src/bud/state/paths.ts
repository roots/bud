import {join, resolve} from 'path'
import type {Directory, Paths} from './types'

/**
 * Current working dir.
 */
const projectDir: Directory = process.cwd()

/**
 * Bud framework dir.
 */
const frameworkDir: Directory = resolve(__dirname, './../../../')

/**
 * Path references.
 */
const paths: Paths = {
  project: projectDir,
  framework: frameworkDir,
  src: join(projectDir, ''),
  dist: join(projectDir, ''),
  public: '',
}

export {paths}
