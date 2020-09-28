import {join} from 'path'

/**
 * Current working directory.
 */
const cwd: string = process.cwd()

/**
 * Project didrectory.
 */
const project: string = cwd

/**
 * Bud framework directory.
 */
const framework: string = __dirname

/**
 * Source files directory.
 */
const src: string = join(project, 'src')

/**
 * Dist files directory.
 */
const dist: string = join(project, 'dist')

/**
 * Public assets directory.
 *
 * @note public is a reserved name. hence, assets.
 */
const assets = '/'

/**
 * Paths repo.
 */
const paths = {
  cwd,
  project,
  framework,
  src,
  public: assets,
  dist,
}

export {paths as default}
