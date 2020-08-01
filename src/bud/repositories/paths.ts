import {resolve} from 'path'
import {projectRoot} from '../util/projectRoot'
import type {Directory} from './types'

/**
 * Current working dir.
 */
const project: Directory = projectRoot

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../../../')

const paths = {
  project,
  framework,
  src: project,
  dist: project,
  public: '/',
}

export {paths}
