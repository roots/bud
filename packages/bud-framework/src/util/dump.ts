import {format} from 'prettier'
import {highlight} from 'cli-highlight'
import {shortCircuit} from './shortCircuit'

type Dump = (obj: any, prettierOptions?: any) => void

/**
 * Dump a prettified, syntax-highlighted object
 */
const dump: Dump = (obj: any, prettierOptions?: any): void => {
  const prettierConfig = prettierOptions ?? {parser: 'json'}

  const normalizedString: string = JSON.stringify(obj, shortCircuit())
  const prettifiedString: string = format(
    normalizedString,
    prettierConfig,
  )
  const highlightedConfig: string = highlight(prettifiedString)

  console.log(highlightedConfig)
}

export {dump}
export type {Dump}
