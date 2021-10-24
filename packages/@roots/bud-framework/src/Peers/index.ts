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
  /**
   * The project name
   *
   * @public
   */
  name: string

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
   * Dependencies
   *
   * @public
   */
  dependencies: {
    [key: string]: string
  }

  /**
   * Development dependencies
   *
   * @public
   */
  devDependencies: {
    [key: string]: string
  }
}

export {Abstract} from './Abstract'
export {Interface} from './Interface'
