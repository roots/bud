/**
 * Hook
 *
 * Mutates a runtime value.
 *
 * Receives a value from a filter reducer and does something
 * with it (or based on it). The returned
 * value is either returned to the filter or passed to the next
 * registered hook (if more than one hook has been registered).
 */
export declare type Hook<T = unknown> = (data: T) => T
