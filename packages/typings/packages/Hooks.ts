export interface Contract {
  has(name: string): boolean

  on<T = any>(name: string, hook: Hook<T>): this

  action<T = unknown>(name: string, binding: T): void

  filter<T = unknown>(name: string, value: T): T
}

/**
 * Hook
 *
 * Function to mutate a runtime value.
 *
 * Receives a value from a filter reducer and does something
 * with it (or based on it). The returned
 * value is either returned to the filter or passed to the next
 * registered hook (if more than one hook has been registered).
 */
export type Hook<T = unknown> = (data: T) => T

/**
 * Store
 *
 * Hook k=>v store.
 */
export type Store = {[key: string]: Hook[]}
