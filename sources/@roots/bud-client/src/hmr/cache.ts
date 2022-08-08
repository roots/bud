/**
 * Last hash received
 * @public
 */
let hash: string

/**
 * Updates are in a fail state
 * @public
 */
let failed: boolean = false

/**
 * Set fail state
 * @public
 */
const setFailed = (state?: boolean) => {
  failed = typeof state === 'undefined' ? true : state
}

/**
 * Set hash
 * @public
 */
const setHash: (hash: Payload['hash']) => void = hash => (hash = hash)

/**
 * Current hash matches value
 * @public
 */
const isStale = (hash?: Payload['hash']) => {
  if (hash) setHash(hash)
  return hash !== window.__webpack_hash__
}

export {hash, setHash, failed, setFailed, isStale}
