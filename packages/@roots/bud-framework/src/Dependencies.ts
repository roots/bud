import type {Service} from './Service'

/**
 * @noInherit
 */
export interface Dependencies extends Service {
  /**
   * Install dependencies
   */
  install(
    dependencies: {
      name: string
      ver: string
      source: string
      type: 'dependencies' | 'devDependencies'
    }[],
  ): void

  /**
   * Returns a boolean indicating whether `dep` is
   * required to be installed.
   */
  shouldInstall(
    dep: string,
    type: 'dependencies' | 'devDependencies',
  ): boolean

  /**
   * Returns project package.json as an object
   */
  pkg(): string

  /**
   * Prints notices to console.
   */
  notify(notices: {msg: string; src: string}[]): void
}
