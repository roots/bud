import type {Dump} from './types'
import {format} from 'prettier'
import {highlight} from 'cli-highlight'
import {shortCircuit} from './shortCircuit'

/**
 * Dump a prettified, syntax-highlighted object
 */
const dump: Dump = (obj: any, prettierOptions?: object) => {
  const prettierConfig = prettierOptions ?? {parser: 'json'}

  const normalizedString: string = JSON.stringify(obj, shortCircuit())
  const prettifiedString: string = format(normalizedString, prettierConfig)
  const highlightedConfig: string = highlight(prettifiedString)

  console.log(highlightedConfig)
}

export {dump}
