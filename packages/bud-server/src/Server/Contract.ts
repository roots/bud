import {Container} from '@roots/bud-typings'
import Server from './'

/**
 * Server
 *
 * Express instance configured with WDS middleware
 * for local development.
 */
interface Contract {
  instance: Server.Instance

  config: Container

  running: boolean

  run(callback?: () => void): this

  listen(callback?: () => void): void

  getConfig(): Container['repository']

  setConfig(config: Container['repository']): void
}

export default Contract
