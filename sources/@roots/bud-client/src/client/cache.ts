let hash: string

let failed: boolean = false

export const flagAsFailed = () => {
  failed = true
}

export const setHash: (hash: Payload['hash']) => void = hash =>
  (hash = hash)

export const isStale = (hash?: Payload['hash']) => {
  if (hash) setHash(hash)
  return hash !== window.__webpack_hash__
}

export {hash, failed}
