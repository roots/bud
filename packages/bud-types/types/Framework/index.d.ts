// Type definitions for Framework
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import * as Container from '@roots/container'
import Bud from '..'
import pino from 'pino'

export default Framework

declare class Framework implements Container.Loose {
  /**
   * FS container
   */
  disks: Bud.Framework.FS

  /**
   * Kill the framework process.
   */
  terminate: (code?: number) => void

  /**
   * Framework logger.
   */
  logger: typeof pino

  /**
   * Set a framework property.
   */
  apply: (key: string, value: Bud.Framework.Repository) => void

  /**
   * Make a new hooks container
   */
  makeHooks: (app: Framework) => Bud['hooks']

  /**
   * Make a new container.
   */
  makeContainer: (
    repo?: Bud.Framework.Repository,
  ) => Bud.Framework.Container

  /**
   * Make a new filesystem container
   */
  makeDisk: (
    key?: string,
    baseDir?: string,
    glob?: string[],
  ) => Bud.Framework.FileContainer
}
