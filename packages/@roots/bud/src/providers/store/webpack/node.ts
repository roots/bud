import type {Node} from 'webpack'

/**
 * @webpack5
 *
 * If you are using node.something:
 * 'empty' replace it with resolve.fallback.something: false.
 */

export const module: Node['module'] = 'empty'

export const dns: Node['dns'] = 'mock'

export const fs: Node['fs'] = 'empty'

export const http2: Node['http2'] = 'empty'

export const net: Node['net'] = 'empty'

export const tls: Node['tls'] = 'empty'

export const child_process: Node['childProcess'] = 'empty'
