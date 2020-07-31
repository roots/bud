import {join, resolve} from 'path'
import {projectRoot} from '../util/projectRoot'
import type {Bud, Directory, Paths} from './types'
import {container} from '../container'

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
const paths: Paths = new container({
  project,
  framework,
  src: project,
  dist: project,
  public: '/',
})

export {paths}
