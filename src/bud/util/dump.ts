import type {Dump} from './types'
import {format} from 'prettier'
import {highlight} from 'cli-highlight'
import {shortCircuit} from './shortCircuit'

/**
 * Dump a prettified, syntax-highlighted object
 *
 * @type {Dump}
 * @param {Object} obj - object to inspect
 */
const dump: Dump = (obj: Object) => {
  const normalizedConfigString: string = JSON.stringify(obj, shortCircuit())

  const prettifiedConfigString: string = format(normalizedConfigString, {
    parser: 'json',
  })

  const highlightedConfigString: string = highlight(prettifiedConfigString)

  console.log(highlightedConfigString)
  process.exit()
}

export {dump}
