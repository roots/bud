import {join, resolve} from 'path'

/**
 * Current working dir
 */
const cwd: string = process.cwd()

/**
 * Bud framework dir.
 */
const framework: string = resolve(__dirname, '../')

/**
 * Paths repo.
 */
const paths = {
  cwd,
  project: cwd,
  framework,
  src: join(cwd, 'src'),
  public: '/',
  dist: join(cwd, 'dist'),
}

export {paths as default}
