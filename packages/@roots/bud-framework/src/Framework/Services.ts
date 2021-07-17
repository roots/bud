import type {Framework} from '.'
import type {Service} from '../Service'

export class Services {
  /**
   * Services which should not be instantiated for child compilers
   */
  public static ParentExclusive = [
    'compiler',
    'discovery',
    'dashboard',
    'server',
  ]

  /**
   * Instantiate services
   */
  public static make(
    app: Framework,
    services: Framework.ServiceConstructor,
  ): void {
    Object.entries(services)
      .filter(Services.filter.bind(app))
      .map(Services.instantiate.bind(app))

    app.services.every(
      (name: string, service: Service) => (app[name] = service),
    )
  }

  /**
   * Filter services
   */
  public static filter(
    this: Framework,
    [name, service],
  ): boolean {
    /**
     * No reason to boot an extension that isn't well written
     */
    if (!service.name) return false

    /**
     * No reason to start server for prod
     */
    if (name == 'server' && this.isProduction) return false

    /**
     * No reason to boot expensive parent services
     * for child compilation instantances
     */
    if (this.isChild && Services.ParentExclusive.includes(name))
      return false

    return true
  }

  /**
   * Instantiate service from entry
   */
  public static instantiate(
    this: Framework,
    [key, Instance],
  ): void {
    this.services.set(key, new Instance(this))
  }
}
