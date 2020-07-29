import {join, resolve} from 'path'
import {projectRoot} from '../util/projectRoot'
import type {Directory, Paths} from './types'

/**
 * Current working dir.
 */
const project: Directory = projectRoot

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../../../')

/**
 * Path references.
 */
const paths: Paths = {
  project,
  framework,
  src: project,
  dist: project,
  public: project,
}

export {paths}
