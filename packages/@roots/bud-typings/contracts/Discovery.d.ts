import {Container, Service} from '.'

export abstract class Discovery extends Service {
  /**
   * Service ident
   */
  name

  /**
   * Collected packages.
   */
  extensions(): Container<{
    name: string
    [key: string]: string | string[]
  }>
}
