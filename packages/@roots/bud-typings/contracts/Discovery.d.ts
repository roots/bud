import {Container, Service} from '.'

export abstract class Discovery extends Service {
  /**
   * Service ident
   */
  name: string | number

  /**
   * Collected packages.
   */
  packages(): Container<{
    name: string
    [key: string]: string | string[]
  }>
}
