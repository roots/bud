import {Signale} from '@roots/bud-support'

import {AdjacentMap, Dependency} from './peers.interface'

export class AdjacencyList {
  /**
   * @public
   */
  public get mapping(): AdjacentMap {
    return new Map(
      Object.values(this.manifests)
        .sort((z: Dependency, y: Dependency) =>
          z.name.localeCompare(y.name),
        )
        .map((manifest: Dependency) => {
          return [manifest.name, manifest]
        }),
    )
  }

  public constructor(
    public manifests: Record<string, Record<string, any>>,
  ) {
    this.has = this.has.bind(this)
    this.adjacentTo = this.adjacentTo.bind(this)
    this.fromRoot = this.fromRoot.bind(this)
  }

  public has(key: string): Boolean {
    return this.mapping.has(key)
  }

  public adjacentTo(name: string): Record<string, any> {
    return this.mapping.get(name)
  }

  public fromRoot(
    key: string,
    list: Array<string> = [],
    queue: Set<string> = new Set([key]),
  ): Array<Dependency> {
    const {log} = new Signale({scope: 'adjacencyList'})

    try {
      const enqueue = (name: string) => queue.add(name)

      for (const peer of queue) {
        if (peer in list) continue
        const peerValue = this.adjacentTo(peer)
        peerValue?.requires.forEach(([peer]) => {
          enqueue(peer)
        })

        list.unshift(peer)
      }

      return list
        .flatMap(item => this.adjacentTo(item))
        .filter(Boolean)
    } catch (e) {
      log(e)
      throw new Error(e)
    }
  }
}
