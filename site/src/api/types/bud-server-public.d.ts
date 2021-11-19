/**
 *  Development server features
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

/// <reference types="node" />

import {Container} from '@roots/container'
import {FSWatcher} from 'fs-extra'
import {Server as Server_2} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'

/**
 * Server service container implementation
 *
 * @public @core @container
 */
export declare class
  extends Service<Server_2.Configuration>
  implements Server_2.Interface
{
  /* Excluded from this release type: _assets */
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public
   */
  name: string
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.application}
   *
   * @public
   */
  application: Server_2.Application
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface."instance"}
   *
   * @public
   */
  instance: Server_2.Instance
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.config}
   *
   * @public
   */
  config: Container<Server_2.Configuration>
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.middleware}
   *
   * @public
   */
  middleware: Server_2.Middleware
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.watcher}
   *
   * @public
   */
  watcher: FSWatcher
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.assets}
   *
   * @public
   */
  get assets(): string[]
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.isWatchable}
   *
   * @readonly @public
   */
  get isWatchable(): boolean
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.getWatchedFilesArray}
   *
   * @public
   * @decorator `@bind`
   */
  getWatchedFilesArray(): string[]
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.processMiddlewares}
   *
   * @public
   * @decorator `@bind`
   */
  processMiddlewares(): void
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.run}
   *
   * @public
   * @decorator `@bind`
   */
  run(): this
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
   *
   * @public
   * @decorator `@bind`
   */
  inject(): void
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
   *
   * @public
   * @decorator `@bind`
   */
  close(): void
}

export {}
