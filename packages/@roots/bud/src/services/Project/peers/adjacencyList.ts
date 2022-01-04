import {AdjacentMap, Dependency} from './peers.interface'

/**
 * Directed adjacency list for project modules
 *
 * @public
 */
export class AdjacencyList {
  /**
   * Map of module keys to adjacent required modules
   *
   * @public
   */
  public get modules(): AdjacentMap {
    return new Map(
      Object.values(this.manifests)
        .sort((a, b) => a.name?.localeCompare(b.name))
        .map(manifest => {
          return [
            manifest.name,
            new Set(manifest.requires.map(r => r[0])),
          ]
        }),
    )
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    public manifests: Record<string, Dependency>,
  ) {
    this.has = this.has.bind(this)
    this.adjacentTo = this.adjacentTo.bind(this)
    this.fromRoot = this.fromRoot.bind(this)
  }

  /**
   * Whether a given key exists
   *
   * @public
   */
  public has(key: string): Boolean {
    return this.modules.has(key)
  }

  /**
   * Dependencies adjacent to a given key
   *
   * @public
   */
  public adjacentTo(name: string): Set<string> {
    return this.modules.get(name) ?? new Set([])
  }

  /**
   * Ordered dependencies from a given key
   *
   * @public
   */
  public fromRoot(root: string): Array<Dependency> {
    if (!this.has(root)) return []

    const ordered: Array<string> = []
    const unordered: Set<string> = this.adjacentTo(root)

    unordered.forEach(dependency => {
      if (ordered.includes(dependency)) return
      this.adjacentTo(dependency).forEach(d => unordered.add(d))
      ordered.unshift(dependency)
    })

    return ordered.map(name => this.manifests[name])
  }
}
