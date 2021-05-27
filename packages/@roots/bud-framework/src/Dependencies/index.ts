import {Service} from '../Service'

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
