import cache from 'cache-manager'
import store from 'cache-manager-fs'
import md5 from 'md5'
import path from 'path'
import type Framework from '@roots/bud-typings'

export class Cache {
  bud: Framework.Bud
  cache: cache
  hashKey = '.hash'

  new = false

  disk: {[key: string]: Framework.FileContainer} = {
    project: null,
    roots: null,
  }

  constructor(bud: Framework.Bud) {
    this.bud = bud
    this.disk.roots = this.bud.disk.get('@roots')
    this.disk.project = this.bud.disk.get('project')

    this.cache = new cache.caching({
      store,
      options: {
        ttl: 60 * 60,
        path: path.join(this.disk.roots.getBase(), '.cache'),
      },
    })

    if (!this.disk.roots.has('.hash')) {
      this.new = true
      this.disk.roots.ensure('.hash')
    }

    this.disk.roots.write('.hash', this.configHash())
  }

  wrap(args: any): void {
    this.cache.wrap(...args)
  }

  valid(): boolean {
    if (!this.hasReferenceHash() || this.new) {
      return false
    }

    return this.referenceHash() == this.configHash()
  }

  set(key: string, value: any): void {
    this.cache.set(key, value)
  }

  flush(): void {
    this.cache.clear()
  }

  hasReferenceHash(): boolean {
    return this.disk.roots.has(this.hashKey)
  }

  referenceHash(): string {
    return this.disk.roots.read(this.hashKey)
  }

  configHash(): string {
    return md5(
      this.disk.project.read(
        process.argv[1].replace(
          this.disk.project.base + '/',
          '',
        ),
      ),
    )
  }
}
