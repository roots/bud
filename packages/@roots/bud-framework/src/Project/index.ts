/**
 * A Bud related peer dependency
 */
export interface Peer {
  /**
   * The module/extension which uses this peer
   */
  source: string

  /**
   * The peer module name
   */
  name: string

  /**
   * The peer module version
   */
  ver: string

  /**
   * The peer module type
   */
  type: 'dependencies' | 'devDependencies'
}

export interface Repository {
  name: string

  peers: {
    [key: string]: Peer
  }

  extensions: {
    [key: string]: Peer
  }

  dependencies: {
    [key: string]: string
  }

  devDependencies: {
    [key: string]: string
  }
}

export {Abstract} from './Abstract'
export {Interface} from './Interface'
