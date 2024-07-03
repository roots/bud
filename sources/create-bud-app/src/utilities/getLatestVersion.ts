import axios from 'axios'

export default async function getLatestVersion() {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/@roots/bud`,
    )
    return response.data[`dist-tags`].latest
  } catch (error) {
    return `latest`
  }
}
