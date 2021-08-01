/**
 * Indexed container value store.
 */
interface Repository {
  [key: string]: any
}

namespace Repository {
  export type Key<I> = (string | number) & keyof I
}

export {Repository}
