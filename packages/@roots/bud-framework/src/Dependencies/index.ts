import type {Service} from '../Service'

/**
 * @interface Dependencies
 */
export interface Dependencies extends Service {
  /**
   * Install production dependencies
   */
  install(
    dependencies: {
      name: string
      ver: string
      source: string
      type: 'dependencies' | 'devDependencies'
    }[],
  ): void
}
