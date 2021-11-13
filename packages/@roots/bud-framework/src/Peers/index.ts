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
  [key: string]: any
}

export {Interface} from './Interface'
