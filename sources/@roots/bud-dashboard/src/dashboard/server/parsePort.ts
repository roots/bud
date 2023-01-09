import isNumber from '@roots/bud-support/lodash/isNumber'
import isString from '@roots/bud-support/lodash/isString'

/**
 * Parse port and return as a string with `:` prefix
 */
const parsePort = (port: string | number | undefined): string => {
  if (
    !port ||
    (isString(port) && [``, `80`, `8080`].includes(port)) ||
    (isNumber(port) && [80, 8080].includes(port))
  )
    return ``

  return `:${port}`
}

export default parsePort
