import {isNumber, isString} from '@roots/bud-support/lodash-es'

/**
 * Parse port and return as a string with `:` prefix
 *
 * @public
 */
const parsePort = (port: string | number): string =>
  (isString(port) && [``, `80`, `8080`].includes(port)) ||
  (isNumber(port) && [80, 8080].includes(port))
    ? ``
    : `:${port}`

export default parsePort
