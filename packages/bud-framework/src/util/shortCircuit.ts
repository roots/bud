type ShortCircuit = () => any

/**
 * JSON.stringify replacement function
 * Prevents circular references in JSON from looping
 */
const shortCircuit: ShortCircuit = () => {
  const seen = new WeakSet()

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }

      seen.add(value)
    }

    return value
  }
}

export {shortCircuit}
export type {ShortCircuit}
