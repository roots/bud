/**
 * A singular entrypoint asset value
 */
export interface EntryObject {
  /**
   * Lower-level representation of entrypoint
   */
  import?: string[]
  /**
   * Array of modules the entrypoint explicitly depends on
   */
  dependsOn?: string[]
}

/**
 * Reducer signature
 */
export interface EntryRecordReducer {
  (all: Record<string, EntryObject>, entries: EntryObject): Record<
    string,
    EntryObject
  >
}
