import {formatUrl} from './formatUrl.js'

/**
 * Get formatted proxy url
 */
const getProxy = (url?: URL) => {
  if (!url) return false

  return formatUrl(url)
}

export default getProxy
