/**
 * Helper utility to read a JSON config file into state.
 */
export const ingestConfig = (
  store: Framework.Store,
  key: string,
  source: unknown,
): void => {
  Object.entries(source).map(([k, v]) => {
    store.use(key).repository
      ? store.use(k).set(k, v)
      : store.create(k, v)
  })
}
