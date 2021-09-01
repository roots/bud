import type {Framework} from '@roots/bud-framework'

import {Bud} from '../Bud'
import {services} from '../Bud/services'
import {config} from '../config'

/**
 * Create a Bud instance in Node
 */
interface Factory {
  (overrides?: Factory.Options): Framework
}

namespace Factory {
  /**
   * Overrides for extensions, services and base configuration.
   */
  export interface Options {
    /**
     * Application name
     *
     * @remarks
     * The name of the parent compiler is used as a base when sourcing configuration files.
     * So, in an implementation that uses the name `app`, the Framework will be sourcing
     * `app.config.js`, `app.development.config.js`, etc.
     */
    name?: Framework['name']

    /**
     * Compilation mode
     *
     * @default `production`
     */
    mode?: Framework['mode']

    /**
     * {@link config config overrides}
     */
    config?: config

    /**
     * {@link Framework.Services Service overrides}
     */
    services?: Framework.Services
  }
}

/**
 * Create a Bud instance in Node
 */
const Factory: Factory = (
  overrides: Factory.Options,
): Framework => {
  const options: Framework.Options = {
    name: overrides?.name ?? 'bud',
    mode: overrides?.mode ?? 'production',
    config,
    services,
  }

  /**
   * Override the default `services` with the provided `overrides.services`
   */
  overrides?.services &&
    Object.assign(options.services, overrides.services)

  /**
   * Override the default {@link Framework.Configuration} with the provided {@link Factory.Options['config']}
   */
  overrides?.config &&
    Object.assign(options.config, overrides.config)

  process.env.BABEL_ENV = options.mode
  process.env.NODE_ENV = options.mode

  process.on('uncaughtException', (err: Error) => {
    // process.stderr.write(JSON.stringify(err))
  })

  return new Bud(options).bootstrap()
}

export {Factory}
