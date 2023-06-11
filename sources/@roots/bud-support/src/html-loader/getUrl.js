'use strict'

module.exports = function (url, options) {
  if (!options) options = {}
  if (!url) return url

  url = String(url.__esModule ? url.default : url)

  if (options.hash) url += options.hash

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return `"`.concat(url, `"`)
  }

  return url
}
