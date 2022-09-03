let cache: Record<string, Cache> = {}

class Cache {
  public hash: string = undefined

  public constructor(public name: string) {
    this.isStale = this.isStale.bind(this)
    this.setHash = this.setHash.bind(this)
  }

  public setHash(hash: Payload['hash']) {
    this.hash = hash
  }

  public isStale(hash?: Payload['hash']) {
    if (typeof hash !== `string`) {
      this.setHash(hash)
      return false
    }

    if (hash) {
      this.setHash(this.hash)
      return hash !== window.__webpack_hash__
    }
  }
}

export {Cache, cache}
