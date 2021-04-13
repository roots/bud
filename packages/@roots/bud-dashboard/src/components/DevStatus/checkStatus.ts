import {Dashboard} from '@roots/bud-framework'
import {axios} from '@roots/bud-support'

/**
 * Request server/proxy resources
 */
export const checkStatus: Dashboard.FetchStatus = async (
  enabled,
  host,
  port,
  update,
): Promise<void> => {
  if (!enabled) return

  try {
    const response = await axios.get(`http://${host}:${port}`, {
      validateStatus: () => true,
    })

    update(response.status)
  } catch (err) {
    console.log(err)
  }
}
