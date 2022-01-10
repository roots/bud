export interface Dependency {
  name: string
  requires: Array<[string, string]>
  version?: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  resolvable?: boolean
  bud?: {
    type: 'extension'
    peers: Array<string>
  }
}

export interface AdjacentMap extends Map<string, Set<string>> {}
