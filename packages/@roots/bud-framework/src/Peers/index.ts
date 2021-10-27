/**
 * A Bud related peer dependency
 */
export interface Peer {
  /**
   * The module/extension which uses this peer
   *
   * @public
   */
  source: string

  /**
   * The peer module name
   *
   * @public
   */
  name: string

  /**
   * The peer module version
   *
   * @public
   */
  ver: string

  /**
   * The peer module type
   *
   * @public
   */
  type: 'dependencies' | 'devDependencies'
}

/**
 * Peer repository
 *
 * @public
 */
export interface Repository {
  version: string

  /**
   * Config files
   *
   * @public
   */
  configFiles: {
    dynamic: Array<string>
    static: Array<string>
  }

  /**
   * The project manifest path
   *
   * @public
   */
  manifestPath: string

  /**
   * Peers of this peer
   *
   * @public
   */
  peers: {
    [key: string]: Peer
  }

  /**
   * Extensions of this peer
   *
   * @public
   */
  extensions: {
    [key: string]: Peer
  }

  /**
   * Resolve paths
   *
   * @public
   */
  resolve: []

  manifest: Record<string, any>
}

export {Abstract} from './Abstract'
export {Interface} from './Interface'
