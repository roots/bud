import {join, resolve} from 'path'

/**
 * Current working dir.
 */
const projectDir = process.cwd()

/**
 * Bud framework dir.
 */
const frameworkDir = resolve(__dirname, './../../../..')

/**
 * Path references.
 *
 * @property {string} framework - project root path
 * @property {string} project - module root path
 * @property {string} src - project src path
 * @property {string} dist - project dist path
 * @property {string} public - project public path
 */
const paths = {
  project: projectDir,
  framework: frameworkDir,
  src: join(projectDir, ''),
  dist: join(projectDir, ''),
  public: '',
}

export {paths}
