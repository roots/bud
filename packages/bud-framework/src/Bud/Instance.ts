export interface Instance {
  /**
   * ## bud.register [🏠 Internal]
   *
   * Register framework components.
   */
  register(containers: [string, any][]): void

  /**
   * ## bud.boot [🏠 Internal]
   *
   * Initialize parts of the application that
   * rely on having container access to registered services.
   */
  boot(): void
}
