import {format} from 'prettier'
import {highlight} from 'cli-highlight'

/**
 * Dump generated config (bud.dump)
 */
const dump = obj => {
  const normalizedConfigString = JSON.stringify(
    obj,
    shortCircuit(),
  )

  const prettifiedConfigString = format(
    normalizedConfigString,
    {parser: 'json'},
  )

  const highlightedConfigString = highlight(
    prettifiedConfigString,
  )

  console.log(highlightedConfigString)
  process.exit()
}

/**
 * JSON.stringify replacement fn
 * Prevents circular references in JSON from looping
 */
const shortCircuit = () => {
  const seen = new WeakSet()

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value) || key == 'UI') {
        return
      }

      seen.add(value)
    }

    return value
  }
}

export {dump}
