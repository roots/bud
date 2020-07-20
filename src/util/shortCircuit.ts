/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
const shortCircuit: ShortCircuit = (): any => {
  // eslint-disable-next-line no-undef
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

export {shortCircuit}
export type ShortCircuit = () => any
