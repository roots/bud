import {Service} from '../Service'

export interface Dependencies extends Service {
  installDev(
    dependencies: {[key: string]: string},
    source: string,
  ): void

  install(
    dependencies: {[key: string]: string},
    source: string,
  ): void
}
