export default async function getLatestVersion() {
  try {
    const response = await fetch(`https://registry.npmjs.org/@roots/bud`)
    const {[`dist-tags`]: tags} = await response.json()
    const version = tags.latest
    return version
  } catch (error) {
    return `latest`
  }
}
