/**
 * Helper utility to read a JSON config file into state.
 */
export const ingestConfig = (
  disk: any,
  key: string,
  source: unknown,
): void => {
  Object.entries(source).map(([k, v]) => {
    disk.get(key).entries().length <= 0
      ? disk.get(k).set(k, v)
      : disk.set(k, v)
  })
}
