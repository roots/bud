import {join, resolve} from 'path'

/**
 * Current working dir.
 *
 * @type {string}
 */
const projectDir = process.cwd()

/**
 * Framework dir.
 *
 * @type {string}
 */
const frameworkDir = resolve(__dirname, './../../../..')

/**
 * Paths
 *
 * @typedef  {Object.<paths>}
 * @property {string} framework - project root path
 * @property {string} project   - module root path
 * @property {string} src       - project src path
 * @property {string} dist      - project dist path
 * @property {string} public    - project public path
 */
const paths = {
  project: projectDir,
  framework: frameworkDir,
  src: join(projectDir, 'src'),
  dist: join(projectDir, 'dist'),
  public: 'dist',
}

export {paths}
