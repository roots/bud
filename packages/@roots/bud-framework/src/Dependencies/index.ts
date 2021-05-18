import {Service} from '../Service'

export interface Dependencies extends Service {
  /**
   * Install development dependencies
   */
  installDev(dependencies: {[key: string]: string}): void

  /**
   * Install production dependencies
   */
  install(dependencies: {[key: string]: string}): void
}
