import {Container, Service} from '.'

export abstract class Discovery extends Service {
  /**
   * Service ident
   */
  name

  /**
   * Collected packages.
   */
  discoverPackages(): void
}
