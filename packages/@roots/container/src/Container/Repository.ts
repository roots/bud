/**
 * Indexed container value store.
 *
 * @public
 */
interface Repository {
  [key: string]: any
}

/**
 * Repository namespace
 *
 * @public
 */
namespace Repository {
  /**
   * Repository key
   *
   * @public
   */
  export type Key<I> = (string | number) & keyof I
}

export {Repository}
