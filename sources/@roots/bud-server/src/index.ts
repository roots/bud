/**
 *  Development server
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import {Server} from '@roots/bud-server/service'

declare module '@roots/bud-framework' {
  interface Services {
    server: Server
  }
}

export default Server
