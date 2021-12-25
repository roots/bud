export interface Dependency {
  name: string
  requires: Set<[string, string]>
  version?: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  bud?: {
    type: 'extension'
    peers: Array<string>
  }
}

export interface AdjacentMap extends Map<string, Dependency> {}
