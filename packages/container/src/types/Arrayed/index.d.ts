export {Arrayed}

declare class Arrayed {
  public repository: Container.ArrayedRepository

  constructor(repository?: Container.ArrayedRepository)

  /**
   * Add an item to the repository.
   */
  public add: Container.Using

  /**
   * Get an item from the repository
   */
  public get: Container.Get

  /**
   * Set a repository item's value
   */
  public set: Container.Using

  /**
   * Check if repository key exists.
   */
  public has: Container.Conditional

  /**
   * Delete an item from the repository.
   */
  public delete: Container.Using
}
