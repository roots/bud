import {join, resolve} from 'path'

/**
 * Current working dir.
 */
const projectDir: Directory = process.cwd()

/**
 * Bud framework dir.
 */
const frameworkDir: Directory = resolve(
  __dirname,
  './../../../',
)

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

type Directory = string

export type Paths = {
  project: Directory
  framework: Directory
  src: Directory
  dist: Directory
  public: Directory
}
