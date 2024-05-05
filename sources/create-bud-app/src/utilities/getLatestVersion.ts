export default async function getLatestVersion() {
  try {
    // eslint-disable-next-line n/no-unsupported-features/es-builtins
    const response = await fetch(`https://registry.npmjs.org/@roots/bud`)
    const {[`dist-tags`]: tags} = await response.json()
    const version = tags.latest
    return version
  } catch (error) {
    return `latest`
  }
}
