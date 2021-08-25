/**
 * Indexed container value store.
 */
interface Repository {
  [key: string]: any
}
declare namespace Repository {
  type Key<I> = (string | number) & keyof I
}
export {Repository}
//# sourceMappingURL=Repository.d.ts.map
